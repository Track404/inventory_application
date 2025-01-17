const db = require('../db/query');

async function getMovies(req, res) {
  const movies = await db.getAllMovies();
  res.render('item', { title: 'Show Movies', movies: movies });
}

async function createMovie(req, res) {
  const director = await db.getAllDirectors();
  res.render('createMovie', { directors: director });
}

async function createMoviePost(req, res) {
  const { title, director, year, number_of_minutes } = req.body;
  await db.insertMovie(
    title,
    Number(director),
    Number(year),
    Number(number_of_minutes)
  );
  res.redirect('/');
}

async function updateMovie(req, res) {
  const movie = await db.getSingleMovie(req.params.title);
  const director = await db.getAllDirectors();
  res.render('updateMovie', { movies: movie, directors: director });
}

async function updateMoviePost(req, res) {
  const { title, director, year, number_of_minutes } = req.body;
  await db.updateMovie(
    title,
    director,
    year,
    number_of_minutes,
    req.params.title
  );
  res.redirect('/');
}

async function deleteMoviePost(req, res) {
  console.log(req.params.title);
  await db.deleteMovieDb(req.params.title);
  res.redirect('/');
}

module.exports = {
  getMovies,
  createMovie,
  createMoviePost,
  updateMovie,
  updateMoviePost,
  deleteMoviePost,
};
