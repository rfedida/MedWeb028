var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/common/views/mainView.html'));
});

router.get('/hello', function(req, res, next) {
  res.send("hello");
});

module.exports = router;
