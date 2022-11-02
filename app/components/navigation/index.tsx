import React, { useEffect } from "react";
import Button from "../ui/Button";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useFetcher, useNavigate } from "@remix-run/react";
import { DEV_URL } from "../login";
import UseUserAuth from "~/utils/hooks/useAuth";

const loginURL = `https://accounts.spotify.com/authorize?client_id=1a98caa930f04397b79800309b24b9c5&response_type=code&redirect_uri=${DEV_URL}&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming&state${"x"}&show_dialog=true`;

function handleStorage() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_in");
}

const Nav: React.FC = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    navigate("/search");
  }
  return (
    <nav className="mx-auto flex h-16 items-center justify-between ">
      <span className=" flex items-center text-xl font-black uppercase tracking-tighter text-secondary-100">
        <ChevronDoubleRightIcon className="h-6 w-6" />
        Sazaana
      </span>

      <a
        href={loginURL}
        className="transition-c z-10 mt-2 rounded  bg-base-100 p-2 text-center font-bold text-zinc-50 hover:bg-secondary-200 hover:text-base-100"
      >
        Login
      </a>
    </nav>
  );
};

export default Nav;
