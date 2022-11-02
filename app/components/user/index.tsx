import React from "react";

interface Props {
  artists: SpotifyApi.UsersTopArtistsResponse;
}

const User: React.FC<Props> = ({ artists }) => {
  return (
    <div>
      <p className="mb-2">Your Recent Top Artists</p>
      <div className="mb-8 flex snap-x snap-mandatory gap-4 overflow-x-scroll">
        {artists.items.map((artist) => {
          return (
            <div key={artist.id} className="flex flex-col pb-2">
              <a href={`/search/${artist.id}`} className="cursor-pointer">
                <div className="aspect-video min-w-[220px] snap-start overflow-hidden rounded">
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="h-full w-full object-cover  transition-opacity duration-300 ease-in-out md:hover:opacity-70"
                  />
                  <p>{artist.name}</p>
                </div>
              </a>
              <p className="mt-2 truncate text-ellipsis font-bold">
                {artist.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
