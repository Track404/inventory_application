const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM directors ORDER BY name');
  return rows;
}

async function insertCategory(category) {
  await pool.query('INSERT INTO directors (name) VALUES ($1)', [category]);
}

async function getSingleCategory(title) {
  const { rows } = await pool.query(
    'SELECT * FROM directors WHERE director_id=$1',
    [title]
  );
  return rows;
}

async function updateCategory(name, id) {
  await pool.query('UPDATE directors SET name=$1 WHERE director_id = $2', [
    name,
    id,
  ]);
}

async function deleteCategoryDb(id) {
  await pool.query('DELETE FROM movies WHERE director_id= $1', [id]);
  await pool.query('DELETE FROM directors WHERE director_id= $1', [id]);
}
module.exports = {
  getAllCategories,
  insertCategory,
  getSingleCategory,
  updateCategory,
  deleteCategoryDb,
};
