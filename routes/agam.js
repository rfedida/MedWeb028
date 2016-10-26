var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page of agam. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..\\public\\agam\\views\\agamView.html'));
});

module.exports = router;
