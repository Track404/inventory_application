const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM directors');
  return rows;
}

module.exports = {
  getAllCategories,
};
