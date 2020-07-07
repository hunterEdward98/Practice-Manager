const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
router.get('/recent/:id', (req, res) => {
    console.log(req.params.id)
    const query1 = `
    SELECT * FROM times
INNER JOIN athletes ON athletes.id=times.athlete_id
WHERE athlete_id=$1
ORDER by date desc LIMIT 1`;
    pool.query(query1, [req.params.id]).then(result => {
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
module.exports = router;