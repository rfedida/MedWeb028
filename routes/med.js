var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page of med. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..\\public\\med\\medView.html'));
});

module.exports = router;
