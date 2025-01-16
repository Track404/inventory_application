const { updateMoviePost } = require('../controllers/dbController');
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

async function getSingleMovie(title) {
  const { rows } = await pool.query('SELECT * FROM movies WHERE id=$1', [
    title,
  ]);
  return rows;
}

async function updateMovie(title, director, year, number_of_minutes, id) {
  await pool.query(
    'UPDATE movies SET title=$1, director_id=$2, year=$3, length_minutes=$4 WHERE id = $5',
    [title, director, year, number_of_minutes, id]
  );
}
module.exports = {
  getAllMovies,
  insertMovie,
  getSingleMovie,
  updateMovie,
};
