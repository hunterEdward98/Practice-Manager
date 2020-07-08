const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM athletes`
  pool.query(queryText).then(result => {
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});
router.get('/athletesActive', (req, res) => {
  const queryText = `SELECT * FROM athletes where active=true`
  pool.query(queryText).then(result => {
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});
router.get('/athletesInLane/:lane', (req, res) => {
  const queryText = `SELECT * FROM athletes where active=true AND lane_number=$1`
  pool.query(queryText, [req.params.lane]).then(result => {
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});
router.get('/byId/:id', (req, res) => {
  console.log(req.params.id)
  const queryText = `SELECT * FROM athletes where id=$1`
  pool.query(queryText, [req.params.id]).then(result => {
    res.send(result.rows)
  }).catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});
/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  if (preq.user.auth_level < 2) {
    res.sendStatus(403)
  }
  const desc = req.body.description;
  const img = req.body.image_url
  const usr = req.user.id
  let queryText = 'INSERT INTO athletes (description, image_url, user_id) VALUES($1,$2,$3)'
  pool.query(queryText, [desc, img, usr]).then(result => {
    res.sendStatus(202);
  }).catch(error => {
    res.sendStatus(500)
  })

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3) { res.sendStatus(403) }
  let queryText = 'DELETE FROM athletes WHERE id=$1'
  pool.query(queryText, [req.params.id]).then(result => {
    res.sendStatus(203)
  }).catch(error => {
    res.sendStatus(500)
  })
});

/**
 * Update an item if the auth_level is 3 or higher
 */
router.put('/', rejectUnauthenticated, (req, res) => {
  const body = req.body;
  const active = body.active;
  const id = body.id;
  const lane = body.lane;
  const year = body.year;
  console.log(body)
  if (req.user.auth_level < 3) { res.sendStatus(403) }
  let queryText = 'UPDATE athletes SET active=$1, year=$2 , lane_number=$3 where id=$4'
  pool.query(queryText, [active, year, lane, id]).then(result => {
    console.log('query successful', result.rows)
    res.sendStatus(203)
  }).catch(error => {
    res.sendStatus(500)
  })
});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});




/**
 * Delete an item if it's something the logged in user added
 */





module.exports = router;