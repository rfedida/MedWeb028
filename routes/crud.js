var express = require('express');
var crudRouter = express.Router();
var mongoose = require('mongoose');
var Unit = require('../models/unitSchema');
var Patient = require('../models/patientSchema');
var dbDisk = require('../server/med/dbdiskconnection');
var index = require('../app');
var pjson = require('../package.json');
var mongo = require('../server/med/mongo');
var files = require('../server/med/files');
var temp = require('../server/med/temp');


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
        mongo.getUnitByUnitId(req.params.id, function(data) {
            res.send(data);
        });
    } else {
        files.getUnitByUnitId(req.params.id, function(data) {
            res.send(data);
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
        mongo.getAllPatients(function(data) {
            res.send(data);
        });
    } else {
        files.getAllPatients(function(data) {
            res.send(data);
        });
    }
});


crudRouter.get('/patients/:id', function (req, res, next) {
    if (pjson.isWeb) {
        mongo.getPatientByBraceletId(req.params.id, function(data) {
            res.send(data);
        });
    } else {
        files.getPatientByBraceletId(req.params.id, function(data) {
            res.send(data);
        });
    }
});

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
                    patient.Stations = mongo.getAllCurrentStationById(patient.Stations, req.params.unitId);

                    // Sort the array by last reception time
                    mongo.sortDesc(patient.Stations, "receptionTime");
                })

                var lastReceptionPatient = patients[0];

                // Run all patients and check what is the last patient who arrived to station
                patients.forEach(function(patient){
                    if (patient.Stations[0].receptionTime > lastReceptionPatient.Stations[0].receptionTime) {
                        lastReceptionPatient = patient;
                    }
                })
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(lastReceptionPatient);
            }
         })
    }
})   

// Get patients by unit id
crudRouter.get('/patients/units/:unitId', function(req, res,next) {   
     if (pjson.isWeb) {
        mongo.getPatientsByUnitId(req.params.unitId, function(data) {
            res.send(data);
        });
     } else {
         mongo.getPatientsByUnitId(req.params.unitId, function(data) {
            res.send(data);
         });
     }    
});

// Insert patient details
crudRouter.post('/patients', function (req, res, next) {
    if (pjson.isWeb) {
        res.send(mongo.insertPatient(req.body.patient));
    } else {
        files.insertPatient(req.body.patient);
        
        // check if online insert to db else insert to temp file
        if (index.isOnline) {
            mongo.insertPatient(req.body.patient, function(data) {
                res.send(data);
            });
        } else {
            temp.insertPatient(req.body.patient);
        }
    }
});

// Update patient details
 crudRouter.put('/patients', function (req, res, next) {
     if (pjson.isWeb) {
         mongo.updatePatient(req.body.patient, function(data) {
             res.send(data);
         });
     } else {
        files.updatePatient(req.body.patient, function(isUpdataed) {
            // Decide what to do if the patient didnt updated 
        });
        
        // check if online update db else update temp file
        if (index.isOnline) {
            mongo.updatePatient(req.body.patient, function(data) {
                res.send(data);
            });
        } else {
            temp.updatePatient(req.body.patient, function(data) {
                res.send(data);
            });
        }
     }
 })

// Update unit details
 crudRouter.put('/units', function (req, res, next) {
    if (pjson.isWeb) {
        mongo.updateUnit(req.body.unit, function(data) {
            res.send(data);
        });
    } else {
        files.updateUnit(req.body.unit, function(data) {
            // Decide what to do if the patient didnt updated
        });

        // check if online update db else update temp file
        if (index.isOnline) {
            mongo.updateUnit(req.body.unit, function(data) {
                res.send(data);
            });
        } else {
            temp.updateUnit(req.body.unit, function(data) {
                res.send(data);
            });
        }
    }
 })

// Get all units under specific unit
crudRouter.get('/units/:unitId/units', function(req, res, next) {
    if (pjson.isWeb) {
        mongo.getUnitsOfUnderUnit(req.params.unitId, function(data) {
            res.send(data);
        });
    } else {
        files.getUnitsOfUnderUnit(req.params.unitId, function(data) {
            res.send(data);
        });
    }
});

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


var InjuryMechanismType = {
   0:  "תלול מסלול" ,
   1: "ירי" ,
   2: "הדף" ,
   3: "אבכ" ,
   4: "כוויה" ,
   5: "שאיפה" ,
   6: "תאונת דרכים"
};

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
             var lior = patients.map(function(currPatient){
                 currPatient.key = InjuryMechanismType[currPatient.key];
                 return currPatient;
             });

             res.json(lior);
             console.log(lior);
        }
        else {}
    });
    
});

module.exports = crudRouter;
