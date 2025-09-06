import db from "#db/client";

export const getAllPlaylists = async () => {
  const sql = `
  SELECT * FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
};

export const getPlaylist = async (id) => {
  const sql = `
  SELECT * FROM playlists WHERE id = $1
  `;
  const { rows: playlist } = await db.query(sql, [id]);
  return playlist[0];
};

export const createPlaylist = async ({ name, description }) => {
  const sql = `
  INSERT INTO playlists(name, description) VALUES($1, $2) RETURNING *
  `;
  const { rows: playlist } = await db.query(sql, [name, description]);
  return playlist[0];
};
