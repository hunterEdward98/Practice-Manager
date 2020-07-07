const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
router.get('/', (req, res) => {
    const query1 = `
    SELECT DISTINCT ON (athletes.athlete_name) *
FROM times
INNER JOIN athletes ON athletes.id=times.athlete_id
INNER JOIN events ON events.id=times.event_id
WHERE event_id=1
ORDER BY athletes.athlete_name, times.date DESC`;
    pool.query(query1).then(result => {
        console.log(result.rows)
        res.send(result.rows)
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