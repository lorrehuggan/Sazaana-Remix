import type { LoaderFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { spotifyApi } from "~/utils/spotify";
import { intToString, randomizeArray } from "~/utils";
import Song from "~/components/song";
import { mydata } from "../../utils/data";
import { HeartIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import OriginalQuery from "~/components/originalQuery";
import Filter from "~/components/filter";
import useTracklistStore from "~/utils/appStore/trackListStore";
import { useEffect } from "react";

export interface LoaderData {
  success: boolean;
  data: {
    originalQuery: {
      name: string;
      id: string;
      image: string;
      followers: number;
      url: string;
      rating: number;
    };
    relatedItems: {
      features: SpotifyApi.AudioFeaturesResponse;
      track: SpotifyApi.TrackObjectFull;
    }[];
  } | null;
  error: null | string;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<TypedResponse<LoaderData>> => {
  //TODO: Add validation for the artist ID and add auth
  // const { artist } = params;
  // let artistId = artist;
  // let relatedArtists = [];
  // let topTracks = [] as SpotifyApi.TrackObjectFull[];
  // let searchedArtist = {
  //   name: "",
  //   id: "",
  //   image: "",
  //   followers: 0,
  //   url: "",
  //   rating: 0,
  // };
  // //Spotify API call
  // const client = await spotifyApi.clientCredentialsGrant();
  // spotifyApi.setAccessToken(client.body.access_token);

  // try {
  //   if (!artistId) {
  //     throw new Error("No artist found");
  //   }
  //   const getRelatedArtists = await spotifyApi.getArtistRelatedArtists(
  //     artistId
  //   );
  //   relatedArtists = getRelatedArtists.body.artists;
  //   const artist = await spotifyApi.getArtist(artistId);
  //   searchedArtist = {
  //     name: artist.body.name,
  //     id: artist.body.id,
  //     image: artist.body.images[0].url,
  //     followers: artist.body.followers.total,
  //     url: artist.body.external_urls.spotify,
  //     rating: artist.body.popularity,
  //   };
  //   const relatedArtistIds = relatedArtists.map((artist) => artist.id);
  //   const getTopTracks = await Promise.all(
  //     relatedArtistIds.map(async (id) => {
  //       const topTracks = await spotifyApi.getArtistTopTracks(id, "US");
  //       return topTracks.body.tracks;
  //     })
  //   );
  //   getTopTracks.forEach((tracks) => {
  //     topTracks.push(
  //       {
  //         ...tracks[1],
  //       },
  //       {
  //         ...tracks[2],
  //       },
  //       {
  //         ...tracks[3],
  //       }
  //     );
  //   });
  //   const audioFeatures = await Promise.all(
  //     topTracks.map(async (track) => {
  //       const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(
  //         track.id
  //       );
  //       return audioFeatures.body;
  //     })
  //   );

  //   const data = audioFeatures.map((feature, index) => {
  //     const track = topTracks[index];
  //     return {
  //       features: feature,
  //       track: track,
  //     };
  //   });
  //   return json({
  //     success: true,
  //     data: {
  //       originalQuery: searchedArtist,
  //       relatedItems: randomizeArray([...data]),
  //     },
  //     error: null,
  //   });
  // } catch (error: any) {
  //   return json({ success: false, data: null, error: error.message });
  // }

  return json(mydata);
};

export default function Index() {
  const { data, error } = useLoaderData<LoaderData>();
  const { setTracklist, tracklist, maxNumOfTracks, setShadowTracklist } =
    useTracklistStore((state) => state);

  useEffect(() => {
    if (data?.relatedItems) {
      setTracklist(data.relatedItems);
      setShadowTracklist(data.relatedItems);
    } else {
      return setTracklist([]);
    }
  }, [setTracklist, data, setShadowTracklist]);

  return (
    <>
      <section className="py-6">
        {error && <p className="text-sm text-amber-500">{error}</p>}
        <div className="relative">
          {data?.originalQuery && <OriginalQuery data={data} />}
          <Filter />
          <div className="space-y-4">
            {tracklist &&
              tracklist
                .slice(0, maxNumOfTracks)
                .map((item) => <Song song={item.track} key={item.track.id} />)}
          </div>
        </div>
      </section>
    </>
  );
}
