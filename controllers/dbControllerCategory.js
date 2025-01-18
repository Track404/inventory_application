const db = require('../db/queryCategory');

async function getCategory(req, res) {
  const category = await db.getAllCategories();
  res.render('category', { title: 'Show Category', categories: category });
}

module.exports = {
  getCategory,
};
