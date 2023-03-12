// * Since this file is loaded in server.js into api/users,
// *   these routes are mounted onto /api/users
// * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
// */

const express = require('express');
const router  = express.Router();

router.get('/:id', (req, res) => {
  req.session.user_id = req.params.id;
  // const cookie = req.session.user_id
  // console.log(cookie)
  res.redirect("/api/lists")

});



module.exports = router;
