import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import useUserStore from "~/utils/appStore/userStore";
import { spotifyApi } from "~/utils/spotify";

export interface UserData {
  user: SpotifyApi.CurrentUsersProfileResponse;
  userTopArtists: SpotifyApi.UsersTopArtistsResponse;
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

export interface LoaderData {
  success: boolean;
  error: string | null;
  data: UserData | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { url } = request;
  const code = url.split("=")[1];

  console.log({ code });

  if (!code) {
    return json({ success: false, data: null, error: "No code found" });
  }

  spotifyApi.setRedirectURI("http://localhost:3000/search/user");

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
  } catch (error: any) {
    console.log({ error });

    return json({ success: false, error });
  }
};

function setLocalStorage(
  access_token: string,
  expires_in: number,
  refresh_token: string
) {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", String(expires_in));
}

const User: React.FC = () => {
  const { data, success, error } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setExpiresIn } = useUserStore();

  useEffect(() => {
    if (data) {
      setLocalStorage(data.access_token, data.expires_in, data.refresh_token);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setExpiresIn(data.expires_in);
      navigate(`/search/${data.userTopArtists.items[0].id}`);
    }
    if (error) {
      navigate("/search");
    }
  }, [navigate, data, error, setAccessToken, setRefreshToken, setExpiresIn]);

  return <div>Loading...</div>;
};

export default User;
