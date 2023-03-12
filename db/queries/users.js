const db = require('../connection');

const loginDefaultUser = () => {
  const values = [];
  return db.query('SELECT * FROM users WHERE user_id = 1;', values)
    .then(data => {
      return data.rows;
    });
};



module.exports = { loginDefaultUser };
