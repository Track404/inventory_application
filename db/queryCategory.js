const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM directors');
  return rows;
}

async function insertCategory(category) {
  await pool.query('INSERT INTO directors (name) VALUES ($1)', [category]);
}
module.exports = {
  getAllCategories,
  insertCategory,
};
