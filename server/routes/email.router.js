const nodemailer = require('nodejs-nodemailer-outlook');
require('dotenv').config()
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const router = express.Router();
router.post('/bug', rejectUnauthenticated, (req, res) => {
    nodemailer.sendEmail({
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'new bug report from:' + req.user.name,
        text: req.body.data,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
});
router.post('/feature', rejectUnauthenticated, (req, res) => {
    nodemailer.sendEmail({
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'new feature request from:' + req.user.name,
        text: req.body.data,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
});
module.exports = router;