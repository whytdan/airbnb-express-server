const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/home');

/* GET homes (filtrated or not) list. */
router.get('/', home_controller.homes_list);

module.exports = router;
