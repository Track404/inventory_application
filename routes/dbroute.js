// routes/usersRouter.js
const { Router } = require('express');
const dbController = require('../controllers/dbController');
const dbRouter = Router();

dbRouter.get('/', dbController.getMovies);
dbRouter.get('/new', dbController.createMovie);
dbRouter.post('/new', dbController.createMoviePost);
dbRouter.get('/:title/update', dbController.updateMovie);
dbRouter.post('/:title/update', dbController.updateMoviePost);
dbRouter.post('/:title/delete', dbController.deleteMoviePost);
module.exports = dbRouter;
