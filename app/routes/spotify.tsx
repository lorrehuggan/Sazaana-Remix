import type { ActionArgs, LoaderFunction } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { spotifyApi } from "~/utils/spotify";

export const action = async ({ request }: ActionArgs) => {
  const client = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(client.body.access_token);

  const formData = request.formData();
  const search = (await formData).get("search");
  const response = await spotifyApi.searchTracks(`artist:${search}`);

  return json({ response }, { status: 200 });
};
