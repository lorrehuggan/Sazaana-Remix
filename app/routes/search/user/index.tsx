import type { LoaderFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { spotifyApi } from "~/utils/spotify";

export interface UserData {
  user: SpotifyApi.CurrentUsersProfileResponse;
  userTopArtist: SpotifyApi.UsersTopArtistsResponse;
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

export interface LoaderData {
  success: boolean;
  error: string | null;
  data: UserData | null;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<TypedResponse<LoaderData>> => {
  const { url } = request;
  const code = url.split("=")[1];

  if (!code) {
    return json({ success: false, data: null, error: "No code found" });
  }

  spotifyApi.setRedirectURI("http://localhost:3000/search/user");

  console.log({ auth: code });
  try {
    const auth = await spotifyApi.authorizationCodeGrant(code);
    if (auth.statusCode !== 200) {
      return json({ success: false, data: null, error: "Invalid code" });
    }
    const access_token = auth.body.access_token;
    const refresh_token = auth.body.refresh_token;
    const expires_in = auth.body.expires_in;
    spotifyApi.setAccessToken(access_token);
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 20 });
    return json({
      success: true,
      data: {
        access_token,
        refresh_token,
        expires_in,
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

const User: React.FC = () => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const access_token = localStorage.getItem("access_token");

      if (fetcher.type === "init") {
        fetcher.submit(
          { access_token: access_token! },
          {
            method: "post",
            action: "/user",
          }
        );
      }
    }
  }, [fetcher]);

  return (
    <div>
      {fetcher.state === ("loading" || "submitting") && <p>Loading...</p>}
      {fetcher.data &&
        fetcher.data.data.userTopArtists.items.map((artist: any) => {
          return <div key={artist.id}>{artist.name}</div>;
        })}
    </div>
  );
};

export default User;
