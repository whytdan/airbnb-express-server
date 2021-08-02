const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category');

/* GET categories list. */
router.get('/', category_controller.categories_list);

module.exports = router;
