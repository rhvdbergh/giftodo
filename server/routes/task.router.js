const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /api/task
// gets all the tasks on the server
router.get('/', (req, res) => {
  console.log('/in GET /api/task');

  // build a SQL query
  const query = `
  SELECT * FROM "task" ORDER BY "id";
  `;

  // run the query
  pool
    .query(query)
    .then((response) => {
      res.send(response.rows); // send back the rows, which contain the data
    })
    .catch((err) => {
      console.log(
        'There was an error retrieving the tasks from the database: ',
        err
      );
      res.sendStatus(500); // tell the client something's gone wrong
    });
});

// POST /api/task
router.post('/', (req, res) => {
  // when added, tasks are incomplete by default

  // build a SQL query
  const query = `
    INSERT INTO "task" 
    ("name", "description", "due_date", "priority", "gif_url")
    VALUES
    ($1, $2, $3, $4, $5);
  `;

  // parameterize the inputs
  const values = [
    req.body.name,
    req.body.description,
    req.body.due_date,
    req.body.priority ?? 5, // add a default value of 5 if null
    req.body.gif_url,
  ];

  // run the query
  pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(201); // item was created
    })
    .catch((err) => {
      console.log(
        'There was an error creating the task in the database: ',
        err
      );
      res.sendStatus(500); // tell the client something's gone wrong
    });
});

module.exports = router;
