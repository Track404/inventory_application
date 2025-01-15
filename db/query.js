const pool = require('./pool');

async function getAllMovies() {
  const { rows } = await pool.query('SELECT * FROM movies');
  return rows;
}

async function insertMovie(title, director, year, number_of_minutes) {
  await pool.query(
    'INSERT INTO movies (title, director_id, year, length_minutes) VALUES ($1, $2, $3, $4)',
    [title, director, year, number_of_minutes]
  );
}
module.exports = {
  getAllMovies,
  insertMovie,
};
