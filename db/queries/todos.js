const db = require('../connection');

//
// Showing Todos
//
const getAllListsByUsers = () => {
  // not sure what we want to output here
};

const getActiveTodosByCategory = () => {
  const values = [];
  return db.query('SELECT * FROM todos WHERE user_id = $1 AND category_id = $2 AND done = FALSE;', values)
  .then(data => {
    return data.rows;
  });
};

const getCompleteTodosByCategory = () => {
  const values = [];
  return db.query('SELECT * FROM todos WHERE user_id = $1 AND category_id = $2 AND done = TRUE;', values)
  .then(data => {
    return data.rows;
  });
};

const getCategoryTodoCount = () => {
  const values = [];
  return db.query('SELECT count(id) FROM todos WHERE user_id = $1 AND category_id = $2 AND done = FALSE;', values)
  .then(data => {
    return data.rows;
  });
};

const sortActiveTodosOldest = () => {
  const values = [];
  return db.query('SELECT * FROM todos WHERE user_id = $1 AND category_id = $2 AND done = FALSE ORDER BY date;', values)
  .then(data => {
    return data.rows;
  });
};

const sortActiveTodosNewest = () => {
  const values = [];
  return db.query('SELECT * FROM todos WHERE user_id = $1 AND category_id = $2 AND done = FALSE ORDER BY date DESC;', values)
  .then(data => {
    return data.rows;
  });
};


//
// Adding, Creating, Deleting, Updating Todos
//
const addTodo = () => {
  const values = [];
  return db.query('INSERT INTO todos (user_id, category_id, name) VALUES ($1, $2, $3)', values)
  .then(data => {
    return data.rows;
  });
};

const updateTodoName = () => {
  const values = [];
  return db.query('UPDATE todos SET name = $1 WHERE user_id = $2 AND id = $3;', values)
  .then(data => {
    return data.rows;
  });
};

const updateTodoCategory = () => {
  const values = [];
  return db.query('UPDATE todos SET category_id = $1 WHERE user_id = $2 AND id = $3;', values)
  .then(data => {
    return data.rows;
  });
};

const updateTodoStatus = () => {
  const values = [];
  return db.query('UPDATE todos SET done = NOT done WHERE user_id = $1 AND id = $2;', values)
  .then(data => {
    return data.rows;
  });
};

const deleteTodo = () => {
  const values = [];
  return db.query('DELETE FROM todos WHERE user_id = $1 AND id = $2;', values)
  .then(data => {
    return data.rows;
  });
};


module.exports = {
  getAllListsByUsers,
  getActiveTodosByCategory, getCompleteTodosByCategory,
  getCategoryTodoCount,
  sortActiveTodosOldest,
  sortActiveTodosNewest,
  addTodo,
  updateTodoName,
  updateTodoCategory,
  updateTodoStatus,
  deleteTodo
};
