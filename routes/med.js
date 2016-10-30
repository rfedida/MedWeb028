var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page of med. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/med/medView.html'));
});

router.post('/saveInj', function(req, res, next) {
  console.log(req.body.injData);
});
module.exports = router;
