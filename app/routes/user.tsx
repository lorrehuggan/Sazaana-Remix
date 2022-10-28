import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { spotifyApi } from "~/utils/spotify";

export const action: ActionFunction = async ({ params, request, context }) => {
  const formData = await await request.formData();
  const access_token = formData.get("access_token");

  if (!access_token) {
    return json({ success: false, error: "No access token found", data: null });
  }

  try {
    spotifyApi.setAccessToken(String(access_token));
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 20 });

    return json({
      success: true,
      data: {
        user: user.body,
        userTopArtists: userTopArtists.body,
      },
      error: null,
    });
  } catch (error) {
    console.log({ error });

    return json({ success: false, error });
  }
};
