const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /api/task
router.get('/', (req, res) => {
  console.log('/in GET /api/task');
  res.send({ success: true });
});

module.exports = router;
