const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const router = require('../../../pg-put-delete-activity/server/routes/book.router');
const Pool = pg.Pool;
const pool = new Pool({
  database: 'koala-holla',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

// GET
koalaRouter.get('/', (req, res) => {
  let queryText = 'SELECT * FROM holla_table;';
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error making query:', queryText, 'error:', err);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
  let newKoala = req.body;
  console.log('adding new koala', newKoala);
  let queryText = `INSERT INTO holla_table ("name", "gender", "age", "ready_to_transfer", "notes")
                        VALUES ($1, $2, $3, $4 ,$5 )`;
  pool
    .query(queryText, [
      newKoala.name,
      newKoala.gender,
      newKoala.age,
      newKoala.readyForTransfer,
      newKoala.notes,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error adding new Koala', err);
      res.sendStatus(500);
    });
});

// PUT
router.put('/transfer/:id', (req, res) => {
  console.log('In put request server side');
  let id = req.params.id;
  let readyForTransfer = req.body.readyForTransfer;
  console.log('readyforTransfer', readyForTransfer, 'id', id);
  let queryText = `
        UPDATE holla_table
            SET "ready_to_transfer" = $1
            WHERE "id" = 4`;
  pool
    .query(queryText, [readyForTransfer, id])
    .then(() => {
      console.log('update to transfer readiness status confirmed');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('err updating transfer status', err);
      res.sendStatus(500);
    });
});

// DELETE
koalaRouter.delete('/:id', (req, res) => {
  let id = req.params.id;
  let queryText = `DELETE FROM holla_table
	        WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then(() => {
      console.log('koala deleted!');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('err DELETING', err);
    });
});

module.exports = koalaRouter;
