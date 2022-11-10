const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool ({
    database: 'koala-holla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM holla_table;';
    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch ((err) => {
        console.log('Error making query:', queryText, 'error:', err);
        res.sendStatus(500);
    })
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;
