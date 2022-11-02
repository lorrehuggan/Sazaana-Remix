import type { ActionFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { spotifyApi } from "~/utils/spotify";
import { uxData } from "~/utils/mockdata/user";

export interface UserActionData {
  success: boolean;
  data: {
    user: SpotifyApi.CurrentUsersProfileResponse;
    userTopArtists: SpotifyApi.UsersTopArtistsResponse;
  };
  error: null | string;
}

export const action: ActionFunction = async ({
  params,
  request,
  context,
}): Promise<TypedResponse<UserActionData>> => {
  const formData = await request.formData();
  const access_token = formData.get("access_token");

  if (!access_token) {
    return json({ success: false, error: "No access token found", data: null });
  }

  try {
    spotifyApi.setAccessToken(String(access_token));
    const user = await spotifyApi.getMe();
    //TDOO: Add refresh token
    if (user.statusCode === 401) {
      return json({
        success: false,
        error: "Invalid access token",
        data: null,
      });
    }
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 20 });

    if (userTopArtists.statusCode === 401) {
      return json({
        success: false,
        error: "Invalid request",
        data: null,
      });
    }

    //return json({ success: true, data: uxData, error: null });
    return json({
      success: true,
      data: {
        user: user.body,
        userTopArtists: userTopArtists.body,
      },
      error: null,
    });
  } catch (error: any) {
    return json({ success: false, error: error.message, data: null });
  }
};
