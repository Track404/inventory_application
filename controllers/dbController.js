const db = require('../db/query');

async function getMovies(req, res) {
  const movies = await db.getAllMovies();
  res.render('item', { title: 'Show Movies', movies: movies });
}

async function createMovie(req, res) {
  res.render('createMovie');
}

async function createMoviePost(req, res) {
  const { title, director, year, number_of_minutes } = req.body;
  console.log(req.body);
  await db.insertMovie(
    title,
    Number(director),
    Number(year),
    Number(number_of_minutes)
  );
  res.redirect('/');
}

async function updateMovie(req, res) {
  res.render('updateMovie');
}

async function updateMoviePost(req, res) {
  const { username } = req.body;
  await db.updateMovie(username);
  res.redirect('/');
}

async function deleteMovie(req, res) {
  await db.deleteMovie();
  res.redirect('/');
}

module.exports = {
  getMovies,
  createMovie,
  createMoviePost,
  updateMovie,
  updateMoviePost,
  deleteMovie,
};
