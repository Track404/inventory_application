const pool = require('./pool');

async function getAllMovies() {
  try {
    const { rows } = await pool.query(
      'SELECT m.id, m.title, m.year, m.length_minutes, d.name AS director FROM movies m JOIN directors d ON m.director_id = d.director_id ORDER BY m.year'
    );
    return rows;
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err;
  }
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

async function getAllDirectors() {
  const { rows } = await pool.query('SELECT * FROM directors');
  return rows;
}

async function updateMovie(title, director, year, number_of_minutes, id) {
  await pool.query(
    'UPDATE movies SET title=$1, director_id=$2, year=$3, length_minutes=$4 WHERE id = $5',
    [title, director, year, number_of_minutes, id]
  );
}

async function deleteMovieDb(id) {
  await pool.query('DELETE FROM movies WHERE id= $1', [id]);
}
module.exports = {
  getAllMovies,
  insertMovie,
  getSingleMovie,
  updateMovie,
  getAllDirectors,
  deleteMovieDb,
};
