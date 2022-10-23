import Footer from "~/components/footer";
import Input from "~/components/input";
import Heading from "~/components/heading";
import Nav from "~/components/navigation";
import { json } from "@remix-run/node";
import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { spotifyApi } from "~/utils/spotify";
import { searchSchema } from "../utils/formValidation";
import z, { ZodError } from "zod";
import { useState } from "react";

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
    const formData = searchSchema.safeParse(body);

    /* If the form data is not valid, it throws an error. */
    if (!formData.success) {
      throw new ZodError(formData.error.issues);
    }

    //Spotify API call
    const client = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(client.body.access_token);
    const response = await spotifyApi.searchTracks(
      `artist:${formData.data.search}`
    );
    const data = response.body;

    //Get all artist IDs
    if (data.tracks) {
      artistIDs = data.tracks.items.map((item) => item.artists[0].id);
    }

    //filter out duplicate artist IDs
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

    return json({ success: true, data: artistDetails, error: null });
  } catch (error) {
    if (error instanceof ZodError) {
      return json({
        success: false,
        data: null,
        error: error.flatten().fieldErrors,
      });
    }
    return json({ data: null, error: error, status: 500 });
  }
};

export default function Index() {
  const [error, setError] = useState(null);
  const [data, setData] = useState<SpotifyApi.SingleArtistResponse[] | null>(
    null
  );

  const searchData = useActionData<{
    success: boolean;
    data: SpotifyApi.SingleArtistResponse[] | null;
    error: { search: string[] };
  }>();

  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <Input />
        {searchData?.success === false &&
          JSON.stringify(searchData.error.search[0], null, 2)}
        {searchData?.success === true &&
          JSON.stringify(searchData?.data, null, 2)}
      </main>
      <Footer />
    </>
  );
}
