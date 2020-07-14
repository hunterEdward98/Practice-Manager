const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//get all events, order by name
router.get('/', (req, res) => {
    console.log(req.user.org_id)
    const queryText = 'SELECT * FROM event WHERE org_id=$1 ORDER BY name'
    pool.query(queryText, [req.user.org_id]).then(result => {
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
    const queryText = 'DELETE FROM event WHERE id=$1;  '
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
    const queryText = 'INSERT INTO event ("name", org_id) values ($1, $2)'
    pool.query(queryText, [name, req.user.org_id]).then(result => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(500)
    })
})
module.exports = router;