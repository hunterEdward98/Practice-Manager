
const pool = require('../modules/pool');
const express = require('express');
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
  if (req.user.auth_level < 2) {
    res.sendStatus(403)
  }
  const desc = req.body.name;
  const img = req.body.lane
  const usr = req.body.year
  console.log(req.body)
  let queryText = 'INSERT INTO athletes (athlete_name, lane_number, year) VALUES($1,$2,$3)'
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
    pool.query('DELETE FROM times WHERE athlete_id=$1').then(result => {
      res.sendStatus(203)
    }).catch(error => [
      res.sendStatus(500)
    ])
  }).catch(error => {
    res.sendStatus(500)
  })
});

/**
 * Update an item if the auth_level is 3 or higher
 */
router.put('/', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3) { res.sendStatus(403) }
  const body = req.body;
  const active = body.active;
  const id = body.id;
  const lane = body.lane;
  const year = body.year;
  let queryText = 'UPDATE athletes SET active=$1, year=$2 , lane_number=$3 where id=$4'
  pool.query(queryText, [active, year, lane, id]).then(result => {
    res.sendStatus(203)
  }).catch(error => {
    res.sendStatus(500)
  })
});
module.exports = router;