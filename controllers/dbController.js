const db = require('../db/query');

const { body, validationResult } = require('express-validator');

// validation of the input data
const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 20 characters.';
const yearErr = 'must be between 1800 and 2100';
const minutesErr = 'must be between 1min and 1000min';

const validateUser = [
  body('title')
    .trim()

    .isLength({ min: 1, max: 20 })
    .withMessage(`Movie ${lengthErr}`),
  body('director').trim().notEmpty(),
  body('year')
    .trim()

    .isInt({
      min: 1800,
      max: 2100,
    })
    .withMessage(`Year ${yearErr}`),

  body('number_of_minutes')
    .trim()

    .isInt({
      min: 1,
      max: 1000,
    })
    .withMessage(`Number of minutes ${minutesErr}`),
];

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
  const dbDirector = await db.getAllDirectors();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render('createMovie', { directors: dbDirector, errors: errors.array() });
  }
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
  const movie = await db.getSingleMovie(req.params.title);
  const dbDirector = await db.getAllDirectors();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('updateMovie', {
      movies: movie,
      directors: dbDirector,
      errors: errors.array(),
    });
  }
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
  validateUser,
  getMovies,
  createMovie,
  createMoviePost,
  updateMovie,
  updateMoviePost,
  deleteMoviePost,
};
