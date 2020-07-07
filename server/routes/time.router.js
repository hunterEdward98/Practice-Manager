const express = require('express');
const pool = require('../modules/pool');
const moment = require('moment')
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
router.get('/recent/:id/:eventId', (req, res) => {
    console.log(req.params.id, req.params.eventId)
    const query1 = `
    SELECT * FROM times
INNER JOIN athletes ON athletes.id=times.athlete_id
WHERE athlete_id=$1 AND event_id=$2
ORDER by date desc LIMIT 1`;
    pool.query(query1, [req.params.id, req.params.eventId]).then(result => {
        console.log(result.rows)
        res.send(result.rows)
    }).catch(error => {
        console.log(error)
        res.sendStatus(500)
    })
});
router.get('/event/:athlete', (req, res) => {
    const athlete = req.params.athlete
    console.log(athlete)
    const queryText = `
    SELECT DISTINCT ON (times.event_id) *
FROM athletes
INNER JOIN times ON athletes.id=times.athlete_id
ORDER BY athletes.id, times.date DESC
    `
    pool.query(queryText, [athlete]).then(result => {
        console.log('query:', result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});
router.post('/', (req, res) => {
    const body = req.body;
    const athlete_id = body.id;
    const event_id = body.event;
    const date = moment().format('MM-DD-YYYY LTS')
    const swim_time = body.time;
    const improvement = body.improvement || 0;

    // const user = req.user  /*LATER*/
    console.log(athlete_id, event_id, date, swim_time, improvement,)
    const queryText = `
    INSERT INTO times(athlete_id, event_id, date, swim_time, added_by, improvement)
    VALUES($1,$2,$3,$4,$5,$6)
     `
    pool.query(queryText, [athlete_id, event_id, date, swim_time, 1, improvement || 0]).then(result => {
        console.log('query:', result.rows);
        res.sendStatus(201)
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
})
module.exports = router;