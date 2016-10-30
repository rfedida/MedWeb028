var express = require('express');
var crudRouter = express.Router();
var mongoose = require('mongoose');
var Unit = require('../models/unitSchema');
var Patient = require('../models/patientSchema');
var dbDisk = require('../server/med/dbdiskconnection');
var pjson = require('../package.json')

function sortDesc(arrayToSort, field){
    var newArray = arrayToSort.sort(function(a,b) {
        return (new Date(b[field]) - new Date(a[field])); 
    });

    return newArray;
}

function getAllCurrentStationById(arrayToSort, currStationId) {

    var onlyCurrentStationArray = [];
    arrayToSort.forEach(function(station) {
        if (station.stationId == currStationId) {
            onlyCurrentStationArray.push(station);
        }
    });
    return onlyCurrentStationArray;
}

crudRouter.get('/units', function (req, res, next) {

    if (pjson.isWeb) {
        Unit.find(function (err, units) {
            if (err) {
                res.send(err); 
            } else {
                res.send(units);
            }
        });
    }
});

crudRouter.get('/units/:id', function (req, res, next) {
    if (pjson.isWeb) {
        Unit.findOne({'id' : req.params.id}, function(err, unit) {
            if (err) { 
                res.send(err);
            } else {
                res.send(unit);
            }
        })
    }
});

crudRouter.delete('/units/:id', function (req, res, next) {
    if (pjson.isWeb) {
        Unit.findOneAndRemove({"id": req.params.id}, function(err, unit) {
            if (err) {
                res.send(err);
            } else {
                res.send({"message": "Unit deleted.", "id": unit.id});
            }
        });
    }
});

crudRouter.get('/patients', function(req, res, next) {
    if (pjson.isWeb) {
        Patient.find(function (err, patients) {
            if (err) {
                res.send(err);
            } else {
                res.send(patients);
            }
        });
    }
});


crudRouter.get('/patients/:id', function (req, res, next) {
    if (pjson.isWeb) {
        Patient.findOne({"braceletId" : req.params.id}, function(err, patient) {
            if (err) { 
                res.send(err);
            } else {
                res.send(patient);
            }
        })
    }
});

// Get patient by id
// crudRouter.get('/patients/:id', function(req, res,next) {
//     if (pjson.isWeb) {
//         Patient.find({"braceletId": req.params.id}, function(err, patient) {
//             if (err) {  
//                 res.send(err);
//             } else {
//                 res.send(patient);
//             }
//         })
//     }
// });

// Get the last patient who arrived to current station
crudRouter.get('/patients/units/:unitId/last', function(req, res,next) {
    if (pjson.isWeb) {
         Patient.find({"CurrentStation" : req.params.unitId},  function(err, patients) {
            if (err) {
                res.send(err);
            } else {
                // Parse to json
                patients = JSON.parse(JSON.stringify(patients));
                
                // Run all patients and sort each station by reception time
                patients.forEach(function(patient){

                    // Pull out all station which equals to current station
                    patient.Stations = getAllCurrentStationById(patient.Stations, req.params.unitId);

                    // Sort the array by last reception time
                    sortDesc(patient.Stations, "receptionTime");
                })

                var lastReceptionPatient = patients[0];

                // Run all patients and check what is the last patient who arrived to station
                patients.forEach(function(patient){
                    if (patient.Stations[0].receptionTime > lastReceptionPatient.Stations[0].receptionTime) {
                        lastReceptionPatient = patient;
                    }
                })

                res.send(lastReceptionPatient);
            }
         })
    }
})   

// Get patients by unit id
crudRouter.get('/patients/units/:unitId', function(req, res,next) {   
     if (pjson.isWeb) {
        Patient.find({"CurrentStation" : req.params.unitId},  function(err, patients) {
        if (err) {
            res.send(err);
        } else {
            // Parse to json
            patients = JSON.parse(JSON.stringify(patients));
            var result = []; 
            
            // Run all patients and save specific fields
            patients.forEach(function(patient){

                // Create new json which inculdes the following fields:
                // braceletId, temperature, storation, bloodPressure, heartbeat
                // Sort each array in measurements according to last timestamps and set the last into json
                var newPatient = {
                                    "braceletId" : patient.braceletId,
                                    "temperature" :  sortDesc(patient.measurements.temperatures, "timestamp")[0].tempreature,
                                    "storation" : sortDesc(patient.measurements.storations, "timestamp")[0].storation,
                                    "bloodPressure" : sortDesc(patient.measurements.bloodPressures, "timestamp")[0].bloodPressure,
                                    "heartbeat" : sortDesc(patient.measurements.heartbeat, "timestamp")[0].heartbeat,
                                    "status" : patient.generalData.emergency,
                                    "receptionTime" : sortDesc(patient.Stations, "receptionTime")[0].receptionTime };
                result.push(newPatient);                
            });

            res.send(result);
        }    
    })}
});

// Update patient details
 crudRouter.put('/patients/:isTure/:object', function (req, res, next) {

     if (pjson.isWeb) {

        req.params.object.LastUpdate = new Date().getTime();

         // If the patient is new
         if (req.params.isTure) {
            Patient.create(req.params.object, function(err, patient){
                  if (err) { 
                    res.send(err);
                  } 
                  else {
                        res.send(patient);
                  }
            })
         }
         // Update the patient 
         else {
            
            Patient.findByIdAndUpdate(req.params.object.braceletId, {$set: req.params.object}, {new: false}, 
                function (err, patient){
                    if (err) { 
                    res.send(err);
                    } else {
                        res.send(patient);
                    }
            });
         }  
     }
 })

// Update patient details
 crudRouter.put('/units/:object', function (req, res, next) {

     if (pjson.isWeb) {

            Unit.findByIdAndUpdate(req.params.object.id, {$set: req.params.object}, {new: false}, 
                function (err, unit){
                    if (err) { 
                    res.send(err);
                    } else {
                        res.send(unit);
                    }
            });
         }  
     
 })

// Get the name of unit by id
// crudRouter.get('/unitName/:id', function(req, res,next) {
//     Unit.findOne({"id": req.params.id} , "name", function(err, unit) {
  //  if (pjson.isWeb) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(unit);
//         }
    //}
//     });
    
// });

// Get all units under specific unit
crudRouter.get('/units/:unitId/units', function(req, res, next) {
    
    if (pjson.isWeb) {
       Unit.find(function (err, units) {
              if (err) {
                console.log(err);
                res.send(err); 
            } else {

                var pattern = "^" + req.params.unitId + "(_[0-9]+)+$";
                var list = [];
                var regex = new RegExp(pattern);
                var bIsIdExist = false;
                units = JSON.parse(JSON.stringify(units));
                
                // Find if the unit id is existed
                for (var i=0; i<units.length; i++) {
                    if(units[i].id === req.params.unitId)
                    bIsIdExist = true;
                }
                
                // If the id exist
                if (bIsIdExist) {
                    
                    // Run all units and find if the are units which match the regex
                    for (var i=0; i<units.length; i++) {
                        if (regex.test(units[i].id))
                            list.push(units[i]);
                    }
                }

                res.send(list);
            }
        });
    }    
});


// crudRouter.get('/units/:id', function(req, res,next) {
//     if (pjson.isWeb) {
//         Patient.findOne({"id": req.params.id} , "name", function(err, unit) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(unit);
//             }
//         });
//     }
// });

crudRouter.delete('/patients/:id', function (req, res, next) {
    if (pjson.isWeb) {
        Patient.findOneAndRemove({"id": req.params.id}, function(err, unit) {
            if (err) {
                res.send(err);
            } else {
                res.send({"message": "Patient data deleted.", "id": unit.id});
            }
        });
    }
});

crudRouter.get('/patientsInjuryLocation', function(req, res, next) {
    console.log("get requst for db");
    Patient.aggregate(
        [
            {$group :
                { _id : "$generalData.injuryLocation", 
                  count : {$sum : 1}}},
            {$sort : {_id : 1}},
            { $project : 
                {
                    key : "$_id",
                    y : "$count",
                    _id : 0
                }
            }
        ],
        function(err, patients){
        if(!err)
         {
             res.json(patients);
             console.log(patients);
        }
        else {}
    });
});

crudRouter.get('/patientsInjuryLocationByTime', function(req, res, next) {
    console.log("get requst for db");
    Patient.aggregate([
            {
                $group :
                {
                    _id : {key: "$generalData.injuryLocation", x: "$Stations.receptionTime"},
                    y : {$sum : 1}
                }
            },
            {
                $sort :
                {
                    _id : 1,
                }
            }
        ],
        function(err, patients){
        if(!err)
         {
             res.json(patients);
             console.log(patients);
        }
        else {}
    });
});

//trying
crudRouter.get('/injuryMechanism' , function(req , res ){
    console.log("get requst for db");
    Patient.aggregate(
        [
            {$group :
                { _id : "$generalData.injuryMechanism", 
                  count : {$sum : 1}}},
            {$sort : {_id : 1}},
            { $project : 
                {
                    key : "$_id",
                    y : "$count",
                    _id : 0
                }
            }
        ],
        function(err, patients){
        if(!err)
         {
             res.json(patients);
             console.log(patients);
        }
        else {}
    });
    
});

module.exports = crudRouter;
