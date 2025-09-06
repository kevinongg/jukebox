import {
  createPlaylist,
  getAllPlaylists,
  getPlaylist,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getAllTracksInPlaylist, getTrack } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const playlists = await getAllPlaylists();
  res.status(200).send(playlists);
});

router.route("/").post(async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Required body is not provided");
  }

  const { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .send("Required fields (name, description) is missing");
  }
  const makePlaylist = await createPlaylist({ name, description });
  res.status(201).send(makePlaylist);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    return res.status(400).send("ID must be a positive integer or not 0");
  }
  const playlist = await getPlaylist(numId);
  if (!playlist) {
    return res.status(404).send("Playlist does not exist");
  }
  return res.status(200).send(playlist);
});

router.route("/:id/tracks").get(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    return res.status(400).send("ID must be a positive integer or not 0");
  }

  const playlist = await getPlaylist(numId);
  if (!playlist) {
    return res.status(404).send("Playlist does not exist");
  }

  const tracks = await getAllTracksInPlaylist(numId);
  if (!tracks) {
    return res.status(400).send("Tracks do not exist");
  }
  return res.status(200).send(tracks);
});

router.route("/:id/tracks").post(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    return res.status(400).send("ID must be a positive integer or not 0");
  }

  const playlist = await getPlaylist(numId);
  if (!playlist) {
    return res.status(404).send("Playlist does not exist");
  }

  if (!req.body) {
    return res.status(400).send("Required body is not provided");
  }

  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).send("Required fields are missing in body");
  }

  const numTrackId = Number(trackId);
  if (!Number.isInteger(numTrackId) || numTrackId < 1) {
    return res.status(400).send("TrackId must be a positive integer or not 0");
  }

  const track = await getTrack(numTrackId);
  if (!track) {
    return res.status(400).send("Track does not exist");
  }

  const newTrack = await createPlaylistTrack({
    playlist_id: numId,
    track_id: numTrackId,
  });
  console.log(newTrack);
  return res.status(201).send(newTrack);
});
