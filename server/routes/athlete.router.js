
const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/*
  Get all of the athletes
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM athlete WHERE org_id=$1 ORDER BY athlete_name`
  pool.query(queryText, [req.user.org_id]).then(result => {
    res.send(result.rows)
  }).catch(error => {
    res.sendStatus(500);
  })
});

// Get the active athletes
router.get('/athletesActive', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM athlete where active=true AND org_id=$1 ORDER BY athlete_name`
  pool.query(queryText, [req.user.org_id]).then(result => {
    res.send(result.rows)
  }).catch(error => {
    res.sendStatus(500);
  })
});
//get the athletes that are active, from the specified lane
router.get('/athletesInLane/:lane', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM athlete where active=true AND lane_number=$1 AND org_id=$2 ORDER BY athlete_name`
  pool.query(queryText, [req.params.lane, req.user.org_id]).then(result => {
    res.send(result.rows)
  }).catch(error => {
    res.sendStatus(500);
  })
});
//get athlete by id
router.get('/byId/:id', (req, res) => {
  const queryText = `SELECT * FROM athlete where id=$1 ORDER BY athlete_name`
  pool.query(queryText, [req.params.id]).then(result => {
    res.send(result.rows)
  }).catch(error => {
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
  let queryText = 'INSERT INTO athlete (athlete_name, lane_number, year, org_id) VALUES($1,$2,$3,$4)'
  pool.query(queryText, [desc, img, usr, req.user.org_id]).then(result => {
    res.sendStatus(202);
  }).catch(error => {
    res.sendStatus(500)
  })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id/:org_id', rejectUnauthenticated, (req, res) => {
  if (req.user.auth_level < 3 || (req.user.org_id != req.body.org_id && req.user.auth_level < 6)) {
    res.sendStatus(403)

  }
  else {
    let queryText = 'DELETE FROM athlete WHERE id=$1'
    pool.query(queryText, [req.params.id]).then(result => {
      pool.query('DELETE FROM time WHERE athlete_id=$1').then(result => {
        res.sendStatus(203)
      }).catch(error => [
        res.sendStatus(500)
      ])
    }).catch(error => {
      res.sendStatus(500)
    })
  }
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
  let queryText = 'UPDATE athlete SET active=$1, year=$2 ,lane_number=$3 where id=$4'
  pool.query(queryText, [active, year, lane, id]).then(result => {
    res.sendStatus(203)
  }).catch(error => {
    res.sendStatus(500)
  })
});
module.exports = router;