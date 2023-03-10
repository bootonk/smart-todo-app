/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/todos');

// GET api/lists/:category : show all lists by user
router.get('/:category', (req, res) => {
  user_id = req.session.user_id;
  console.log('cookie',user_id)
  category_id = req.params.category
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
  console.log('cookie',user_id)
  category_id = req.params.category
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
  category_id = req.body.category_id;
  todo_name = req.body.todo_name;
  userQueries.addTodo(user_id, category_id, todo_name)
    .then(todo => {
      res.json(todo);
      console.log(todo)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

// POST api/lists/:id/update
router.get('/:id/update', (req, res) => {
  user_id = req.session.user_id;
  // userQueries.updateTodo()
  //   .then(todo => {
  //     res.json({ todo });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
});

// POST api/lists/:id/delete
router.get('/:id/update', (req, res) => {
  user_id = req.session.user_id;
  userQueries.deleteTodo(user_id, id)
    .then(todo => {
      res.json({ todo });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
