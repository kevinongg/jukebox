import db from "#db/client";

export const getAllTracks = async () => {
  const sql = `
  SELECT * FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
};

export const getTrack = async (id) => {
  const sql = `
  SELECT * FROM tracks WHERE id = $1
  `;
  const { rows: track } = await db.query(sql, [id]);
  return track[0];
};

export const getAllTracksInPlaylist = async (id) => {
  const sql = `
  SELECT tracks.* 
  FROM 
    playlists_tracks
    JOIN tracks ON tracks.id = playlists_tracks.track_id
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
  WHERE
    playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
};

export const createTrack = async ({ name, duration_ms }) => {
  const sql = `
  INSERT INTO tracks(name, duration_ms) VALUES($1, $2) RETURNING *
  `;
  const { rows: track } = await db.query(sql, [name, duration_ms]);
  return track[0];
};
