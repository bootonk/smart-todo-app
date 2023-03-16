// * Since this file is loaded in server.js into api/users,
// *   these routes are mounted onto /api/users
// * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
// */

const express = require('express');
const router  = express.Router();

//GET /logout/
router.get('/', (req, res) => {
  req.session = null; // destroy the session
  res.clearCookie('session'); // clear the session cookie
  res.send('logout test')

});


module.exports = router;