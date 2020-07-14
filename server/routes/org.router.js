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
module.exports = router;