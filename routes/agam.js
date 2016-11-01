var express = require('express');
var router = express.Router();
var path = require('path');
//var graphOccupation = require('../server/agam/OccupationControl.js');
//var Units = require('../models/unitSchema.js');
//var Patient = require('../models/patientSchema.js');
var Units = require('../server/common/models/unitSchema');
var Patient = require('../server/common/models/patientSchema');
var graphOccupation = require('../server/agam/OccupationControl');
var MapUnits = require('../server/agam/MapUnitsControl.js');
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


router.get('/GetUnitsOnMap/:userHirarchy',function(req,res,next){
    var x=res.req.params;
    var userHirarchy = res.req.params.userHirarchy;
    MapUnits.GetUnitsOnMap(userHirarchy,function(UnitsArr) {
        res.json(UnitsArr)})
  //  MapUnits.GetEmergency(CurrentStation,UrgencyType)
    });

router.get('/GetEmergency/:CurrentStation/:UrgencyType',function(req,res,next){
    var x=res.req.params;
    var CurrentStation = res.req.params.CurrentStation;
    var UrgencyType = res.req.params.UrgencyType;
    MapUnits.GetEmergency(CurrentStation,function(CurrentStation,UrgencyType) {
        res.json(count)})
  //  MapUnits.GetEmergency(CurrentStation,UrgencyType)
    });

router.get('/getPatientsAmount/:unitid', function(req, res, next){
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

router.get('/allPatientsAmount/:userHirarchy', function(req, res, next){
    var userHirarchy = res.req.params.userHirarchy;
    Patient.aggregate(
        [{"$match": {"CurrentStation" : {"$regex": "^" + userHirarchy}}},
        {"$group" : {
            "_id" : {"Station": "$CurrentStation",
                "Emergency": "$generalData.emergency"},
            "count": {"$sum": 1}
            }},
        {"$group":{
            "_id" : "$_id.Emergency",
            "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
        }, {"$sort":{"_id" : 1}}], function(err, result){
            res.send(result);
        });
});

module.exports = router;
