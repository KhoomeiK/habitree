const express = require('express');
//const config = require('../config');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
        res.render('index', {
                title: "Index"
        });
});

module.exports = router;