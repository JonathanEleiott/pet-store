const express = require('express');
const router = express.Router();

router.use('/owners', require('./owners.js'));
router.use('/pets', require('./pets.js'));

router.get('/products', (req, res) => {
  res.send('Products');
});

module.exports = router;