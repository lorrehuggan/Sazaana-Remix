import { Link } from "@remix-run/react";
import React from "react";
import { Howl, Howler } from "howler";
import * as Progress from "@radix-ui/react-progress";
import useAudioStore from "../../utils/appStore/audioStore";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";

interface Props {
  song: SpotifyApi.TrackObjectFull;
}

const Song: React.FC<Props> = ({ song }) => {
  return (
    <div className="item-center flex gap-2 overflow-x-hidden">
      <img
        src={song.album.images[0].url}
        alt={song.name}
        className="h-16 w-16 rounded object-cover"
      />
      <SongDetails song={song} />
      {song.preview_url && <SongPreview song={song} />}
    </div>
  );
};

export default Song;

const SongDetails: React.FC<Props> = ({ song }) => {
  return (
    <div className="flex w-full flex-col justify-end overflow-x-hidden border-b border-zinc-800 pb-1">
      <a href={song.external_urls.spotify}>
        <p className="truncate font-bold hover:text-emerald-300">{song.name}</p>
      </a>
      <div className="flex overflow-hidden truncate ">
        {song.artists.slice(0, 20).map((artist, i) => {
          return (
            <Link key={i} to={`/search/${artist.id}`}>
              <span className="mr-1 cursor-pointer truncate text-clip text-sm hover:text-amber-400">
                {i < song.artists.length - 1 ? artist.name + ", " : artist.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SongPreview: React.FC<Props> = ({ song }) => {
  const [playPosition, setPlayPosition] = React.useState<number>(0);
  const globalPlaying = useAudioStore((state) => state.playing);
  const setGlobalPlaying = useAudioStore((state) => state.setPlaying);
  const [localPlaying, setLocalPlaying] = React.useState<boolean>(false);

  const stop = () => {
    Howler.stop();
    setLocalPlaying(false);
    setGlobalPlaying(false);
    previewTrack.stop();
    previewTrack.seek(0);
    setPlayPosition(0);
  };

  const previewTrack = new Howl({
    src: [song.preview_url!],
    html5: true,
    preload: true,
    autoplay: false,
    loop: false,
    volume: 0.5,
    onplay: () => {
      setLocalPlaying(true);
      setGlobalPlaying(true);
    },
    onend: () => {
      stop();
      setLocalPlaying(false);
      setGlobalPlaying(false);
    },
  });

  const play = () => {
    // If the song is playing, stop it.
    if (globalPlaying) {
      stop();
      return;
    }
    previewTrack.play();
    setInterval(() => {
      setPlayPosition(
        Math.floor((previewTrack.seek() / previewTrack.duration()) * 100)
      );
      return;
    }, 1000);
  };

  return (
    <div className="flex w-24 flex-col justify-end gap-1">
      <button onClick={play} className="text-sm uppercase">
        Preview
      </button>
      <Progress.Root
        value={10}
        className="h-[1px] w-full overflow-hidden rounded bg-zinc-800"
      >
        <Progress.Indicator
          className="h-full w-full bg-emerald-500 ease-out"
          style={{ transform: `translateX(-${100 - playPosition}%)` }}
        />
      </Progress.Root>
    </div>
  );
};
