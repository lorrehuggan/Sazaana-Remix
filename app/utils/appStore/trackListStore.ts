import create from "zustand";

type Track = {
  features: SpotifyApi.AudioFeaturesResponse;
  track: SpotifyApi.TrackObjectFull;
};

interface TracklistStore {
  maxNumOfTracks: number;
  popularity: number[];
  danceability: number[];
  energy: number[];
  valence: number[];
  tempo: number[];
  acousticness: number[];
  tracklist: Track[];
  shadowTracklist: Track[];
  setMaxNumOfTracks: (maxNumOfTracks: number) => void;
  setPopularity: (popularity: number[]) => void;
  setDanceability: (danceability: number[]) => void;
  setEnergy: (energy: number[]) => void;
  setValence: (valence: number[]) => void;
  setTempo: (tempo: number[]) => void;
  setAcousticness: (acousticness: number[]) => void;
  setTracklist: (tracklist: Track[]) => void;
  setShadowTracklist: (shadowTracklist: Track[]) => void;
}
const useTracklistStore = create<TracklistStore>((set) => ({
  tracklist: [],
  shadowTracklist: [],
  maxNumOfTracks: 20,
  popularity: [0, 100],
  danceability: [0, 1],
  energy: [0, 1],
  valence: [0, 1],
  tempo: [0, 200],
  acousticness: [0, 1],
  setShadowTracklist: (shadowTracklist) => set({ shadowTracklist }),
  setMaxNumOfTracks: (maxNumOfTracks) => set({ maxNumOfTracks }),
  setPopularity: (popularity) => set({ popularity }),
  setDanceability: (danceability) => set({ danceability }),
  setEnergy: (energy) => set({ energy }),
  setValence: (valence) => set({ valence }),
  setTempo: (tempo) => set({ tempo }),
  setAcousticness: (acousticness) => set({ acousticness }),
  setTracklist: (tracklist) => set({ tracklist }),
}));

export default useTracklistStore;
