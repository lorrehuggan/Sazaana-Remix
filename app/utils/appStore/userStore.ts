import zustand from "zustand";

interface UserStore {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const useUserStore = zustand<UserStore>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useUserStore;
