import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { spotifyApi } from "~/utils/spotify";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { url } = request;
  const code = url.split("=")[1];
  if (typeof code !== "string") {
    return { redirect: "/" };
  }

  spotifyApi.setRedirectURI("http://localhost:3000/search/user");

  try {
    const auth = await spotifyApi.authorizationCodeGrant(code);
    const access_token = auth.body.access_token;
    const refresh_token = auth.body.refresh_token;
    const expires_in = auth.body.expires_in;
    spotifyApi.setAccessToken(access_token);
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 20 });
    console.log(userTopArtists.body.items);

    console.log(user.body);

    return json({
      success: true,
      access_token,
      refresh_token,
      expires_in,
      user: user.body,
      userTopArtists: userTopArtists.body,
    });
  } catch (error) {
    console.log({ error });

    return json({ success: false, error });
  }
};

const User: React.FC = () => {
  return (
    <div>
      <h1>User</h1>
      <h1>User</h1>
      <h1>User</h1>
      <h1>User</h1>
      <h1>User</h1>
    </div>
  );
};

export default User;
