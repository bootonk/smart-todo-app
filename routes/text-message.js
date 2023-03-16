/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log('req.query from twiilio',req.query)
  const phoneNumber = req.query.phoneNumber;
  const message1 = req.query.body;
  const accountSid = process.env.TWIILIO_ACCOUNT; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWIILIO_AUTHTOKEN; // Your Auth Token from www.twilio.com/console

  const client = require('twilio')(accountSid, authToken);
  
      client.messages
        .create({
          body: message1,
          to: phoneNumber, // Text this number
          from: '++15075568682', // From a valid Twilio number
        })
        .then((message) => res.json({message}));
}); 

module.exports = router;