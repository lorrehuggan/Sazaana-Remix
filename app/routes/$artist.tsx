import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import Footer from "~/components/footer";
import Heading from "~/components/heading";
import Nav from "~/components/navigation";
import Button from "~/components/ui/Button";
import type { LoaderFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyApi } from "~/utils/spotify";
import { randomizeArray } from "~/utils";

interface LoaderData {
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
  const { artist } = params;
  let artistId = artist;
  let relatedArtists = [];
  let topTracks = [] as SpotifyApi.TrackObjectFull[];
  let searchedArtist = {
    name: "",
    id: "",
    image: "",
    followers: 0,
    url: "",
    rating: 0,
  };
  //Spotify API call
  const client = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(client.body.access_token);

  try {
    if (!artistId) {
      throw new Error("No artist found");
    }
    const getRelatedArtists = await spotifyApi.getArtistRelatedArtists(
      artistId
    );
    relatedArtists = getRelatedArtists.body.artists;
    const artist = await spotifyApi.getArtist(artistId);
    searchedArtist = {
      name: artist.body.name,
      id: artist.body.id,
      image: artist.body.images[0].url,
      followers: artist.body.followers.total,
      url: artist.body.external_urls.spotify,
      rating: artist.body.popularity,
    };
    const relatedArtistIds = relatedArtists.map((artist) => artist.id);
    const getTopTracks = await Promise.all(
      relatedArtistIds.map(async (id) => {
        const topTracks = await spotifyApi.getArtistTopTracks(id, "US");
        return topTracks.body.tracks;
      })
    );
    getTopTracks.forEach((tracks) => {
      topTracks.push(
        {
          ...tracks[1],
        },
        {
          ...tracks[2],
        },
        {
          ...tracks[3],
        }
      );
    });
    const audioFeatures = await Promise.all(
      topTracks.map(async (track) => {
        const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(
          track.id
        );
        return audioFeatures.body;
      })
    );

    const data = audioFeatures.map((feature, index) => {
      const track = topTracks[index];
      return {
        features: feature,
        track: track,
      };
    });
    return json({
      success: true,
      data: {
        originalQuery: searchedArtist,
        relatedItems: randomizeArray([...data]),
      },
      error: null,
    });
  } catch (error: any) {
    return json({ success: false, data: null, error: error.message });
  }
};

export default function Index() {
  const { data, error } = useLoaderData<LoaderData>();

  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <div className="mt-8 flex w-full justify-between border-b pb-2 ">
          {data?.originalQuery && (
            <div className="flex items-center gap-1">
              <img
                src={data?.originalQuery.image}
                alt={data?.originalQuery.name}
                className="h-10 w-10 rounded object-cover"
              />
              <p className="truncate text-xl font-bold">
                {data && `${data.originalQuery.name}`}
              </p>
            </div>
          )}
          <Link to="..">
            <Button
              type="submit"
              theme="primary-outline"
              size="small"
              title="Search"
            >
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        {data &&
          data.relatedItems.map((item) => (
            <div key={item.track.id}>{item.track.artists[0].name}</div>
          ))}
      </main>
      <Footer />
    </>
  );
}
