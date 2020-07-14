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
router.get('/athletes/:org_id', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 6) {
        res.sendStatus(403)
    }
    else {
        const queryText = 'SELECT id FROM athlete WHERE org_id=$1'
        pool.query(queryText, [req.params.org_id]).then(result => {
            res.send(result.rows)
        }).catch(error => {
            res.sendStatus(500)
        })
    }
})
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.auth_level < 6) {
        res.sendStatus(403)
    }
    else {
        const queryText = 'DELETE FROM organization WHERE id=$1'
        pool.query(queryText, [req.params.id]).then(result => {
            pool.query('DELETE FROM event WHERE org_id=$1', [req.params.id])
            pool.query('DELETE FROM "user" WHERE org_id=$1', [req.params.id])
            res.sendStatus(203)
        }).catch(error => {
            res.sendStatus(500)
        })
    }
})
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'INSERT INTO organization(name) values($1)'
    pool.query(queryText, [req.body.name]).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
module.exports = router;