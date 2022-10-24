import { Link } from "@remix-run/react";

interface Props {
  artists: SpotifyApi.SingleArtistResponse[] | null;
}
const DropDown: React.FC<Props> = ({ artists }) => {
  return (
    <ul className=" max-h-72 w-full space-y-4 overflow-y-scroll rounded-b-lg bg-zinc-800 p-2">
      {artists?.map((artist) => (
        <li
          key={artist.id}
          className=" group flex items-center gap-2 transition-colors duration-200 ease-in-out hover:bg-zinc-700"
        >
          <img
            src={artist.images[0].url}
            alt={`${artist.name}`}
            className="h-10 w-10 rounded object-cover"
          />
          <Link
            className="text-sm font-bold transition-colors duration-200  ease-in-out hover:text-emerald-400"
            to={`${artist.id}`}
          >
            {artist.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
