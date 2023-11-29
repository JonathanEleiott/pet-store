const express = require('express');
const router = express.Router();

const { getOwners } = require('../db/owners.js');

router.get('/', async(req, res) => {
  try {
    const owners = await getOwners();
  
    res.send(owners);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;