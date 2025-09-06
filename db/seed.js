import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const playlistId = [];
  for (let i = 0; i < 10; i++) {
    const response = await createPlaylist({
      name: faker.music.album(),
      description: faker.music.genre(),
    });
    playlistId.push(response.id);
  }

  const trackId = [];
  for (let i = 0; i < 20; i++) {
    const response = await createTrack({
      name: faker.music.songName(),
      duration_ms: faker.number.int(50),
    });
    trackId.push(response.id);
  }

  for (let i = 0; i < 15; i++) {
    let randomPlaylistId = 1 + Math.floor(Math.random() * playlistId.length);
    let randomTrackId = 1 + Math.floor(Math.random() * trackId.length);
    // console.log(randomPlaylistId);
    // console.log(randomTrackId);
    await createPlaylistTrack({
      playlist_id: randomPlaylistId,
      track_id: randomTrackId,
    });
  }
}
