import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { artist } = params;

  console.log(artist);

  return {
    artist,
  };
};

const ArtistPlaylist: React.FC = () => {
  const data = useLoaderData();
  return <p>{JSON.stringify(data)}</p>;
};
export default ArtistPlaylist;
