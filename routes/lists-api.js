/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/todos');

// GET api/lists : show all lists by user
router.get('/', (req, res) => {
  user_id = req.session.user_id;
  category_id = 2;
  userQueries.getActiveTodosByCategory(user_id, category_id)
    .then(lists => {
      res.json({ lists });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });git 
    });
  // res.send("see all lists by user")

});

// POST api/lists : add new todo
router.post('/', (req, res) => {
  user_id = req.session.user_id;
  userQueries.addTodo(user_id, category_id, name)
    .then(todo => {
      res.json({ todo });
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
