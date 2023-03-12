/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//NEED TO CHECK THE FOLDER KATE CREATED
const userQueries = require('../db/queries/users');

// GET api/lists : show all list by user
router.get('/', (req, res) => {
  // userQueries.getAllListsByUser()
  //   .then(lists => {
  //     res.json({ lists });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  res.send("see all lists by user")

});

// POST api/lists : add new todo
router.post('/', (req, res) => {
  // userQueries.AddTodo()
  //   .then(todo => {
  //     res.json({ todo });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });

});

// POST api/lists/:id/update
router.get('/:id/update', (req, res) => {
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
  // userQueries.deleteTodo()
  //   .then(todo => {
  //     res.json({ todo });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
});


module.exports = router;
