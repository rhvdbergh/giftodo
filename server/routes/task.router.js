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

module.exports = router;
