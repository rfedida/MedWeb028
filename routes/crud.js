var express = require('express');
var crudRouter = express.Router();
var mongoose = require('mongoose');
var Unit = require('../models/unitSchema');
var Patient = require('../models/patientSchema');
var dbDisk = require('../server/med/dbdiskconnection');
var pjson = require('../package.json')


function sortArrayByLastTimestamp(arrayToSort) {

    arrayToSort.sort(function(a,b) {
        return parseFloat(b.timestamp) - parseFloat(a.timestamp); 
    });
}

crudRouter.get('/units', function (req, res, next) {

    if (pjson.isWeb) {
        Unit.find(function (err, units) {
            if (err) {
                console.log(err);
                res.send(err); 
            } else {
                console.log(units);
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

// Get patient by id
crudRouter.get('/patients/:id', function(req, res,next) {
    if (pjson.isWeb) {
        Patient.findOne({"id": req.params.id, function(err, patient) {
            if (err) {
                res.send(err);
            } else {
                res.send(patient);
            }
        }});
    }
});

// Get patients by unit id
crudRouter.get('/patients/units/:unitId', function(req, res,next) {   
     if (pjson.isWeb) {
        Patient.find({"CurrentStation" : req.params.id}, "braceletId measurements",  function(err, patients) {
        if (err) {
            res.send(err);
        } else {
            var result = []; 
            
            // Run all patients and save specific fields
            patients.forEach(function(patient){

                // Create new json which inculdes the following fields:
                // braceletId, temperature, storation, bloodPressure, heartbeat
                // Sort each array in measurements according to last timestamps and set the last into json
                var newPatient = {
                                    "braceletId" : patient.braceletId,
                                    "temperature" :  sortArrayByLastTimestamp(patient.measurements.temperatures)[0].tempreature,
                                    "storation" : sortArrayByLastTimestamp(patient.measurements.storations)[0].storation,
                                    "bloodPressure" : sortArrayByLastTimestamp(patient.measurements.bloodPressures)[0].bloodPressure,
                                    "heartbeat" : sortArrayByLastTimestamp(patient.measurements.heartbeat)[0].heartbeat };
                result.push(newPatient);                
            });

            res.send(result);
        }    
    })
    }
});
  // Update patient details
// crudRouter.update('/patients/:object', function (req, res, next) {
//     //Patient.find
// })

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
    var list = [];
    var units = Unit.find();
    var pattern = "^" + req.params.unitId + "[_\d]{1}[0-9]+$";
    var regex = new RegExp(pattern);
    var bIsIdExist = false;

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
    res.json(list);
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

module.exports = crudRouter;
