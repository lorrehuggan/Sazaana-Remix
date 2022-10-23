import SpotifyWebApi from "spotify-web-api-node";

/* Creating a new instance of the SpotifyWebApi class. */
export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
