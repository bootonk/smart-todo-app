/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/todos');
const { apiCalls } = require('../external-apis/api-calls');

// GET api/lists/:category : show all lists by user
router.get('/:category', (req, res) => {
  user_id = req.session.user_id;
  console.log('cookie',user_id);
  category_id = req.params.category;
  console.log(category_id);
  userQueries.getActiveTodosByCategory(user_id, category_id)
    .then(lists => {
      res.json(lists);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET api/lists/count/:category : show all lists by user
router.get('/count/:category', (req, res) => {
  user_id = req.session.user_id;
  console.log('cookie',user_id);
  category_id = req.params.category;
  console.log(category_id);
  userQueries.getCategoryTodoCount(user_id, category_id)
    .then(lists => {
      res.json(lists[0].count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST api/lists : add new todo
router.post('/', (req, res) => {
  user_id = req.session.user_id;
  // category_id = req.body.category_id;
  todo_name = req.body.todo_name;
  apiCalls(todo_name)
    .then((category_id) => {
      userQueries.addTodo(user_id, category_id, todo_name)
        .then(todo => {
          res.json(todo);
          console.log(todo);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .catch();
});

// POST api/lists/:id/update
router.post('/:id/update', (req, res) => {
  console.log('req.body',req.body)
  const user_id = req.session.user_id;
  const todo_id = req.params.id;
  const category_id = req.body.id;
  console.log({category_id});
  userQueries.updateTodoCategory(category_id, user_id, todo_id)
    .then(todo => {
      res.json(todo[category_id]);
      console.log('categoryName', todo[category_id]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST api/lists/:id/delete
router.post('/:id/delete', (req, res) => {
  const user_id = req.session.user_id;
  const todo_id = req.params.id;
  userQueries.deleteTodo(user_id, todo_id)
    .then(todo => {
      delete db[todo_id];
      res.json({ todo });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
