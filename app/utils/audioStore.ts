import create from "zustand";

interface AudioStore {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}
const useAudioStore = create<AudioStore>((set) => ({
  playing: false,
  setPlaying: (playing: boolean) => set({ playing }),
}));

export default useAudioStore;
