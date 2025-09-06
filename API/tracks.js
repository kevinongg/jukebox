import { getAllTracks, getTrack } from "#db/queries/tracks";

import express from "express";
const router = express.Router();
export default router;

router.route("/").get(async (req, res) => {
  const tracks = await getAllTracks();
  res.status(200).send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId < 1) {
    res.status(400).send("ID must be a positive integer or not 0");
  }

  const track = await getTrack(numId);
  if (!track) {
    res.status(404).send("Track does not exist");
  }
  res.status(200).send(track);
});
