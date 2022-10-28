import React from "react";
import { AuthUser } from "~/utils/spotify";

interface Props {
  id?: string;
}

export const DEV_URL = "http://localhost:3000/search/user";

const Login: React.FC<Props> = ({ id }) => {
  return (
    <div className=" space-y-2 rounded bg-base-200 p-2">
      <h4 className="text-xl font-bold">Save your playlist</h4>
      <div className="h-[1px] bg-zinc-50"></div>
      <div>Sign in with Spotify and save your songs to a playlist</div>
      <div className="flex w-full items-center justify-center">
        <a
          href={`https://accounts.spotify.com/authorize?client_id=1a98caa930f04397b79800309b24b9c5&response_type=code&redirect_uri=${DEV_URL}&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming&state${id}&show_dialog=true`}
          className="transition-c z-10 mt-2 w-full rounded  bg-base-100 p-2 text-center font-bold text-zinc-50 hover:bg-secondary-200 hover:text-base-100"
        >
          Sign in with spotify
        </a>
      </div>
    </div>
  );
};

export default Login;
