const db = require('../connection');

const getUserNameById = (id) => {
  const values = [`${id}`];
  return db.query('SELECT name FROM users WHERE id = $1;', values)
    .then(data => {
      return data.rows;
    });
};



module.exports = { getUserNameById };
