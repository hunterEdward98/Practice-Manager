const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM events'
    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
router.post('/', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 3) {
        res.sendStatus(403)
    }
    const body = req.body
    const queryText = 'SELECT * FROM events'
    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
module.exports = router;