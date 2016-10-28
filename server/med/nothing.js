var router = express.Router();
var express = require('express');
var crud = require('./routes/crud');


router.post('/saveInj', function(req, res, next) {
  console.log(req.params.injData);
});