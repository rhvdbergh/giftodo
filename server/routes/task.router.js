const express = require('express');
const router = express.Router();

// GET /api/task
router.get('/', (req, res) => {
  console.log('/in GET /api/task');
  res.send({ success: true });
});

module.exports = router;
