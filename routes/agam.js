var express = require('express');
var router = express.Router();
var path = require('path');
var graphOccupation = require('../server/agam/OccupationControl.js');
var Units = require('../server/common/models/unitSchema.js');

/* GET home page of agam. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/agam/views/agamView.html'));
});

router.get('/Occupation/:userHirarchy', function(req, res, next){
  var x= res.req.params;
  var userHirarchy = res.req.params.userHirarchy;
  graphOccupation.getOcupationAmoutGraph(userHirarchy, function(fullJson) {
      res.json(fullJson);
  });
  
});

router.get('/units/:userHirarchy', function(req, res, next){
  var x= res.req.params;
  var userHirarchy = res.req.params.userHirarchy;
  Units.find({'id': new RegExp('^'+userHirarchy)}, function(err, units) {
            if (err) { 
                res.send(err);
            } else {
                res.send(units);
            }
    });
});

module.exports = router;
