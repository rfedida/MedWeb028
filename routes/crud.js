var express = require('express');
var crudRouter = express.Router();
var mongoose = require('mongoose');
var Unit = require('../models/unitSchema');
var Patient = require('../models/patientSchema');

crudRouter.get('/units', function (req, res, next) {
    Unit.find(function (err, units) {
        if (err) {
            res.send(err); 
        } else {
            res.send(units);
        }
    });
});

crudRouter.get('/units/:id', function (req, res, next) {
    Unit.findOne({'id' : req.params.id}, function(err, unit) {
        if (err) { 
            res.send(err);
        } else {
            res.send(unit);
        }
    })
});

crudRouter.delete('/units/:id', function (req, res, next) {
    Unit.findOneAndRemove({"id": req.params.id}, function(err, unit) {
        if (err) {
            res.send(err);
        } else {
            res.send({"message": "Unit deleted.", "id": unit.id});
        }
    });
});

crudRouter.get('/patients', function(req, res, next) {
    Patient.find(function (err, patients) {
        if (err) {
            res.send(err);
        } else {
            res.send(patients);
        }
    });
});

crudRouter.get('/patients/:id', function(req, res,next) {
    Patient.findOne({"id": req.params.id, function(err, patient) {
        if (err) {
            res.send(err);
        } else {
            res.send(patient);
        }
    }});
});

crudRouter.get('/patients/units/:unitId', function(req, res,next) {
    Patient.find({"CurrentStation" : req.params.id}, "braceletId measurements",  function(err, patients) {
        if (err) {
            res.send(err);
        } else {
            var result = []; 
            patients.forEach(function(patient){
                var newPatient = {
                                    "braceletId" : patient.braceletId,
                                    "temperatures" : undefined,
                                    "storations" : undefined,
                                    "bloodPressures" : undefined,
                                    "heartbeat" : undefined };
                
                // sort each array
                arrayToSort.sort(function(a,b) {
                    //return parseFloat() - parseFloat
                })

            })
            res.send();
        }    
    })
});

crudRouter.get('/units/:id', function(req, res,next) {
    Patient.findOne({"id": req.params.id} , "name", function(err, unit) {
        if (err) {
            res.send(err);
        } else {
            res.send(unit);
        }
    });
});

crudRouter.delete('/patients/:id', function (req, res, next) {
    Patient.findOneAndRemove({"id": req.params.id}, function(err, unit) {
        if (err) {
            res.send(err);
        } else {
            res.send({"message": "Patient data deleted.", "id": unit.id});
        }
    });
});

//trying
crudRouter.get('/injuryMechanism' , function(req , res ){
    console.log("get requst for db");
    Patient.find({},function(err, users){
        if(!err)
         {
             res.json(users);
             console.log(users);
        }
        else {}
    });
    
});

module.exports = crudRouter;
