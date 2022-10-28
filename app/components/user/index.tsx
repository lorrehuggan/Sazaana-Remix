import React from "react";
import useUserStore from "~/utils/appStore/userStore";

const User: React.FC = () => {
  const { user, userFavorites } = useUserStore();
  return (
    <div>
      <div>
        {user && (
          <div className="flex w-full items-center">
            {userFavorites?.items.map((artist) => {
              return (
                <div key={artist.id} className=" w-28">
                  <p>{artist.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
