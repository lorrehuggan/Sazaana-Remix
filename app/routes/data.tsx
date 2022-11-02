import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ZodError } from "zod";
import { searchSchema } from "~/utils/formValidation";
import { spotifyApi } from "~/utils/spotify";

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
      `artist:${formData.data.artist}`
    );

    //Get all artist IDs
    const data = response.body;
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
    return json({
      data: null,
      error: "Oops looks like something went wrong",
      status: 500,
    });
  }
};
