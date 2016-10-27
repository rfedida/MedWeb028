var express = require('express');
var router = express.Router();
var path = require('path');
var graphOccupation = require('../server/agam/OccupationControl.js');

/* GET home page of agam. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..\\public\\agam\\views\\agamView.html'));
});

router.get('/Occupation/:userHirarchy', function(req, res, next){
  var userHirarchy = res.params.userHirarchy;
  var fullJson = graphOccupation.getOcupationAmoutGraph(userHirarchy);
  res.send(fullJson);
});

module.exports = router;
