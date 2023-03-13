const db = require('../connection');

const getUserByEmail = (email) => {
  const values = [`${email}`];
  return db.query('SELECT * FROM users WHERE email = $1;', values)
    .then(data => {
      return data.rows;
    });
};



module.exports = { getUserByEmail };
