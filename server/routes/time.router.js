const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/byAthlete/:athlete', (req, res) => {
    const athlete = req.params.athlete
    console.log(athlete)
    const queryText = `
    SELECT athletes.athlete_name, events.event_name, swim_time, times.date, times.id
    FROM times
    JOIN events on times.event_id=events.id
    JOIN athletes on times.athlete_id = athletes.id
    WHERE athletes.athlete_name ilike $1
    ORDER BY event_name DESC AND ORDER BY times.date DESC
    `
    pool.query(queryText, [athlete]).then(result => {
        console.log('query:', result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});
router.get('/byEvent/:event', (req, res) => {
    const event = req.params.event
    console.log(event)
    const queryText = `
    SELECT athletes.athlete_name, events.event_name, time.swim_time, times.date, times.id
    FROM athletes
    JOIN events on times.event_id = events.id
    JOIN times on times.athlete_id = athletes.id
    WHERE athletes.athlete_name ilike $1
    ORDER BY event_name DESC AND ORDER BY times.date DESC
    `
})