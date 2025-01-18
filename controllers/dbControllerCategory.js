const db = require('../db/queryCategory');

const { body, validationResult } = require('express-validator');

// validation of the input data

const lengthErr = 'must be between 1 and 20 characters.';

const validateCategory = [
  body('category')
    .trim()

    .isLength({ min: 1, max: 20 })
    .withMessage(`Category ${lengthErr}`),
];
async function getCategory(req, res) {
  const category = await db.getAllCategories();
  res.render('category', { title: 'Show Category', categories: category });
}

async function createCategory(req, res) {
  res.render('createCategory');
}

async function createCategoryPost(req, res) {
  const { category } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('createCategory', { errors: errors.array() });
  }
  await db.insertCategory(category);
  res.redirect('/category');
}

async function updateCategory(req, res) {
  const category = await db.getSingleCategory(req.params.title);

  res.render('updateCategory', { category: category });
}

async function updateCategoryPost(req, res) {
  const { category } = req.body;
  const dbCategory = await db.getSingleCategory(req.params.title);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('updateCategory', {
      category: dbCategory,
      errors: errors.array(),
    });
  }
  await db.updateCategory(category, req.params.title);
  res.redirect('/category');
}

async function deleteCategoryPost(req, res) {
  await db.deleteCategoryDb(req.params.title);
  res.redirect('/category');
}
module.exports = {
  validateCategory,
  getCategory,
  createCategory,
  createCategoryPost,
  updateCategory,
  updateCategoryPost,
  deleteCategoryPost,
};
