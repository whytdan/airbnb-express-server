var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (_, res) {
  res.send('categories');
});

module.exports = router;
