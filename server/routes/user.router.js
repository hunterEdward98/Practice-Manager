const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
router.get('/all', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3) {
    res.sendStatus(403)
  }
  let queryText = 'SELECT * FROM "users" ORDER BY id'
  pool.query(queryText).then(result => res.send(result.rows)).catch(() => res.send(500))
})
router.put('/', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3 || req.user.auth_level < req.body.auth) {
    res.sendStatus(403)
  }
  const body = req.body
  console.log(body)
  let queryText = 'UPDATE users SET name=$1, auth_level=$2 WHERE id=$3'
  pool.query(queryText, [body.user, body.auth, body.id])
    .then(() => res.sendStatus(201))
    .catch((error) => res.sendStatus(500));
});
router.delete('/:id/:auth', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3 && req.user.auth_level <= req.params.auth_level) {
    res.sendStatus(403)
  }
  else {
    let queryText = 'DELETE FROM users WHERE id=$1'
    console.log(req.params.id)
    pool.query(queryText, [req.params.id])
      .then(() => res.sendStatus(203))
      .catch((error) => res.sendStatus(500));
  }
})
// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const queryText = 'INSERT INTO users (name, pass_hash, auth_level) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, 0])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
