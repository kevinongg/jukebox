import express from "express";
const app = express();
export default app;

import playlistRoutes from "./API/playlists.js";
import trackRoutes from "./API/tracks.js";
import playlistsTrackRoutes from "./API/playlists_tracks.js";

app.use(express.json());

app.use("/playlists", playlistRoutes);
app.use("/tracks", trackRoutes);
app.use("/playlistsTracks", playlistsTrackRoutes);

app.route("/").get((req, res) => {
  res.send("I am in the playlists tracks API");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("OH NO, SOMETHING WENT TOTALLY WRONG!");
});
