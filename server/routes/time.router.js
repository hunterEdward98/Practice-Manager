const express = require('express');
const pool = require('../modules/pool');
const moment = require('moment')
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//get most recent time from athlete in event
router.get('/recent/:id/:eventId', (req, res) => {
    const query1 = `
    SELECT * FROM times
INNER JOIN athlete ON athlete.id=times.athlete_id
WHERE athlete_id=$1 AND event_id=$2
ORDER by date desc LIMIT 1`;
    pool.query(query1, [req.params.id, req.params.eventId]).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
});

//get all times from athlete
router.get('/event/:athlete', (req, res) => {
    const athlete = req.params.athlete
    const queryText = `
    SELECT DISTINCT  *
    FROM times
    INNER JOIN times ON athlete.id=times.athlete_id
    ORDER BY athlete.id, times.date DESC
    `
    pool.query(queryText, [athlete]).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500);
    })
});

//LOOKS LIKE A DUPE. CHECK IT OUT LATER
router.get('/athlete/:id', (req, res) => {
    const athlete = req.params.id
    const queryText = `
    SELECT times.id, times.*, event.name as event_name FROM times
    LEFT JOIN event ON event.id = times.event_id
WHERE athlete_id = $1
ORDER BY times.date DESC
    `
    pool.query(queryText, [athlete]).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500);
    })
});
//edit time, use body
router.put('/', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 3) {
        res.sendStatus(403);
    }
    const body = req.body;
    const time_id = body.id;
    const event_id = Number(body.event);
    const swim_time = body.time;
    const impChange = body.improvementChange
    // const user = req.user  /*LATER*/
    const queryText = `
    UPDATE times
    SET swim_time=$1, event_id=$2, improvement=improvement+$3
    WHERE id = $4
     `
    pool.query(queryText, [swim_time, event_id, impChange, time_id]).then(result => {
        res.sendStatus(201)
    }).catch(error => {
        res.sendStatus(500);
    })
})

//add time using body
router.post('/', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 2) {
        res.sendStatus(403);
    }
    const body = req.body;
    const athlete_id = body.id;
    const event_id = body.event;
    const date = moment(new Date()).format('MM-DD-YYYY LTS')
    const swim_time = body.time;
    const improvement = body.improvement || 0;
    // const user = req.user  /*LATER*/
    const queryText = `
    INSERT INTO times(athlete_id, event_id, "date", swim_time, added_by, improvement)
    VALUES($1,$2,$3,$4,$5,$6)
     `
    pool.query(queryText, [athlete_id, event_id, date, swim_time, req.user.id, improvement || 0]).then(result => {
        res.sendStatus(201)
    }).catch(error => {
        res.sendStatus(500);
    })
})
//delete time
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 3) {
        res.sendStatus(403);
    }
    // const user = req.user  /*LATER*/
    const queryText = `
    DELETE FROM times WHERE id=$1
     `
    pool.query(queryText, [req.params.id]).then(result => {
        res.sendStatus(203)
    }).catch(error => {
        res.sendStatus(500);
    })
})
module.exports = router;