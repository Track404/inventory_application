// routes/usersRouter.js
const { Router } = require('express');
const dbController = require('../controllers/dbController');
const dbControllerCategory = require('../controllers/dbControllerCategory');
const dbRouter = Router();
// Router for movies
dbRouter.get('/', dbController.getMovies);

dbRouter.get('/new', dbController.createMovie);
dbRouter.post('/new', dbController.validateUser, dbController.createMoviePost);
dbRouter.get('/:title/update', dbController.updateMovie);
dbRouter.post(
  '/:title/update',
  dbController.validateUser,
  dbController.updateMoviePost
);
dbRouter.post('/:title/delete', dbController.deleteMoviePost);

//Router for category
dbRouter.get('/category', dbControllerCategory.getCategory);
dbRouter.get('/category/new', dbControllerCategory.createCategory);
dbRouter.post(
  '/category/new',
  dbControllerCategory.validateCategory,
  dbControllerCategory.createCategoryPost
);

module.exports = dbRouter;
