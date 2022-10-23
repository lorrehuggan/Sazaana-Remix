import Footer from "~/components/footer";
import Input from "~/components/input";
import Heading from "~/components/heading";
import Nav from "~/components/navigation";
import { json } from "@remix-run/node";
import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { spotifyApi } from "~/utils/spotify";
import { searchSchema } from "../utils/formValidation";
import { ZodError } from "zod";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sazaana",
  viewport: "width=device-width,initial-scale=1",
});

export const action: ActionFunction = async ({ request }) => {
  let artistIDs: string[] = [];
  try {
    // Get the search query from the request body
    const _formData = await request.formData();
    const body = Object.fromEntries(_formData);
    const formData = searchSchema.parse(body);

    //Spotify API call
    const client = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(client.body.access_token);
    const response = await spotifyApi.searchTracks(`artist:${formData.search}`);
    const data = response.body;

    //Get all artist IDs
    if (data.tracks) {
      artistIDs = data.tracks.items.map((item) => item.artists[0].id);
    }

    // filter out duplicate artist IDs
    artistIDs = artistIDs.filter(
      (id, index) => artistIDs.indexOf(id) === index
    );

    //Get all artist details
    const artistDetails = await Promise.all(
      artistIDs
        .sort(() => Math.random() - 0.5)
        .map(async (id) => {
          const artist = await spotifyApi.getArtist(id);
          return artist.body;
        })
    );

    return json(artistDetails, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return json({
        response: null,
        error: error.flatten().fieldErrors,
        status: 400,
      });
    }
    return json({ formData: null, error: error, status: 500 });
  }
};

export default function Index() {
  const data = useActionData<SpotifyApi.SingleArtistResponse[]>();

  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <Input />
        {data && data.map((artist) => <div key={artist.id}>{artist.name}</div>)}
      </main>
      <Footer />
    </>
  );
}
