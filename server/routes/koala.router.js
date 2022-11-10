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
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding new koala', newKoala);
    let queryText = `INSERT INTO holla_table ("name", "gender", "age", "ready_to_transfer", "notes")
                        VALUES ($1, $2, $3, $4 ,$5 )`
    pool
        .query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
        .then((result) => {
           res.sendStatus(201);
        })
        .catch ((err) => {
           console.log('error adding new Koala', err);
           res.sendStatus(500);
        });
});


// PUT


// DELETE

module.exports = koalaRouter;
