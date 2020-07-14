const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//get all events, order by name
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM organization ORDER BY name'
    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
//delete event
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 3) {
        res.sendStatus(403)
    }
    const queryText = 'DELETE FROM events WHERE id=$1;  '
    pool.query(queryText, [req.params.id]).then(result => {
        pool.query('DELETE FROM times WHERE event_id=$1', [req.params.id])
            .then(response => {
                console.log('successfull deletes')
                res.sendStatus(203)
            })
            .catch(error => {
                res.sendStatus(500)
            });
    }).catch(error => {
        res.sendStatus(500)
    });
})
//add event using body
router.post('/', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 3) {
        res.sendStatus(403)
    }
    const name = req.body.name
    console.log(name)
    const queryText = 'INSERT INTO events(event_name) values ($1)'
    pool.query(queryText, [name]).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
module.exports = router;