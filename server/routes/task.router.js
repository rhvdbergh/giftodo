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

// PUT /api/task/:id
// updates a task
router.put('/:id', (req, res) => {
  // build the SQL query
  const query = `
    UPDATE "task"
    SET 
    name = $1,
    description = $2, 
    due_date = $3,
    priority = $4,
    gif_url = $5,
    complete = $6
    WHERE id = $7;
  `;

  // parameterize the inputs
  const values = [
    req.body.name,
    req.body.description,
    req.body.due_date,
    req.body.priority,
    req.body.gif_url,
    req.body.complete,
    req.params.id,
  ];

  // run the query
  pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(204); // item was updated
    })
    .catch((err) => {
      console.log(
        'There was an error updating the task in the database: ',
        err
      );
      res.sendStatus(500); // tell the client something's gone wrong
    });
});

// DELETE /api/task/:id
// deletes a specific task from the db
router.delete('/:id', (req, res) => {
  console.log('in DELETE /api/task/:id with id:', req.params.id);
  // build the SQL query
  const query = `
    DELETE FROM "task" 
    WHERE id = $1;
  `;

  // run the query with parameterized input
  pool
    .query(query, [req.params.id])
    .then((response) => {
      res.sendStatus(204); // item was updated
    })
    .catch((err) => {
      console.log(
        'There was an error deleting the task from the database: ',
        err
      );
      res.sendStatus(500); // tell the client something's gone wrong
    });
});

module.exports = router;
