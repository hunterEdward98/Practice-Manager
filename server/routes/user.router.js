const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
//get all users
router.get('/all', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3) {
    res.sendStatus(403)
  }
  else {
    console.log(req.user.org_id)
    let queryText = 'SELECT * FROM "user" where org_id=$1'
    pool.query(queryText, [req.user.org_id]).then(result => {
      res.send(result.rows)
    }).catch(() => res.send(500))
  }
})

//edit user after authorization check
router.put('/', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3 || req.user.auth_level < req.body.auth || req.user.auth_level < req.body.old_auth || req.user.org_id != req.body.org_id) {
    res.sendStatus(403)
  }
  else {
    const body = req.body
    console.log(body)
    let queryText = 'UPDATE "user" SET name=$1, auth_level=$2 WHERE id=$3'
    pool.query(queryText, [body.user, body.auth, body.id])
      .then(() => res.sendStatus(201))
      .catch((error) => res.sendStatus(500));
  }
});

//delete user after authorization check.
router.delete('/:id/:auth/:org_id', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3 && req.user.auth_level <= req.params.auth_level || req.user.org_id != req.params.org_id) {
    res.sendStatus(403)
  }
  else {
    let queryText = 'DELETE FROM "user" WHERE id=$1'
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
  const org_id = Number(req.body.org_id)
  const queryText = 'INSERT INTO "user"(name, pass_hash, auth_level, org_id) VALUES ($1, $2, $3, $4) RETURNING id';
  pool.query(queryText, [username, password, 0, org_id])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    });
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
