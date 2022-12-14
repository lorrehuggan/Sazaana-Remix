import zustand from "zustand";

interface UserStore {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string;
  setRefreshToken: (refreshToken: string) => void;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
  setUser: (user: SpotifyApi.CurrentUsersProfileResponse) => void;
  userFavorites: SpotifyApi.UsersTopArtistsResponse | null;
  setUserFavorites: (userFavorites: SpotifyApi.UsersTopArtistsResponse) => void;
  setExpiresIn: (expiresIn: number) => void;
  expiresIn: number;
}

const useUserStore = zustand<UserStore>((set) => ({
  setExpiresIn: (expiresIn) => set({ expiresIn }),
  expiresIn: 0,
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
  refreshToken: "",
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  user: null,
  setUser: (user) => set({ user }),
  userFavorites: null,
  setUserFavorites: (userFavorites) => set({ userFavorites }),
}));

export default useUserStore;
