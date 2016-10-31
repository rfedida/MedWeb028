var express = require('express');
var router = express.Router();
var path = require('path');
var graphOccupation = require('../server/agam/OccupationControl');
var Units = require('../server/common/models/unitSchema');
var Patient = require('../server/common/models/patientSchema');

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

router.get('/getPatients/:unitid', function(req, res, next){
    var x= res.req.params;
    var unitid = res.req.params.unitid;
    Patient.aggregate(
	[
		{
			$match: {
              
				"CurrentStation" :  {"$regex": "^" + unitid }
			}
		},
		{
			$group: {
				_id : "$generalData.emergency",
				 count : {$sum : 1}
			}
		},
		{
			$sort: {
			_id : 1
			}
		},
	], function(err, result){
        if (err){
            res.send(err);
        }else{
             res.send(result);
        }
    });
});

module.exports = router;
