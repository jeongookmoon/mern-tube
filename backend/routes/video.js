const express = require('express');
const router = express.Router();

router.post('/upload', (request, response) => {
  console.log('response', response);
});

module.exports = router;