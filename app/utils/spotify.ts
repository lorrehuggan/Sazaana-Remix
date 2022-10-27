import SpotifyWebApi from "spotify-web-api-node";

/* Creating a new instance of the SpotifyWebApi class. */
export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
const DEV_URL = "http://localhost:3000/";
const PROD_URL = "https://www.sazaana.com/";

export function AuthUser(id: string) {
  return `https://accounts.spotify.com/authorize?client_id=1a98caa930f04397b79800309b24b9c5&response_type=code&redirect_uri=${DEV_URL}/${id}&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming&state=state&show_dialog=true`;
}
