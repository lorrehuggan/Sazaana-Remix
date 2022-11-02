import type { ActionFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import React, { useEffect } from "react";
import User from "~/components/user";
import type { UserActionData } from "~/routes/user";
import { spotifyApi } from "~/utils/spotify";

const TopArtist: React.FC = () => {
  const { submit, data: fetcherData, type } = useFetcher<UserActionData>();

  useEffect(() => {
    if (fetcherData?.data) {
      return;
    }

    const access_token = localStorage.getItem("access_token");
    const expires_in = localStorage.getItem("expires_in");
    const refresh_token = localStorage.getItem("refresh_token");

    if (!access_token && !expires_in && !refresh_token) {
      return;
    }

    if (type !== "init") {
      return;
    }

    // submit(
    //   {
    //     access_token: access_token ? access_token : "",
    //     expires_in: expires_in ? expires_in : "",
    //     refresh_token: refresh_token ? refresh_token : "",
    //   },
    //   {
    //     method: "post",
    //     action: "/user",
    //   }
    // );
  }, [fetcherData, submit, type]);

  return (
    <>{fetcherData && <User artists={fetcherData.data.userTopArtists} />}</>
  );
};

export default TopArtist;
