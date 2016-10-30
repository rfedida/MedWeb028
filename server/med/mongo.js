var mongoose = require('mongoose');
var Unit = require('../models/unitSchema');
var Patient = require('../models/patientSchema');

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

module.exports = {
    getAllPatients: () => {
        Patient.find(function (err, patients) {
            if (err) {
                return err;
            } else {
                return patients;
            }
        });
    },
    getPatientByBraceletId: (braceletId) => {
        Patient.findOne({"braceletId" : braceletId}, function(err, patient) {
            if (err) { 
                return err;
            } else {
                return patient;
            }
        })
    },
    getPatientsByUnitId: (unitId) => {
        Patient.find({"CurrentStation" : unitId},  function(err, patients) {
            if (err) {
                return err;
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

                return result;
            }
        });  
    },
    getUnitByUnitId: (unitId) => {
        Unit.findOne({'id' : unitId.id}, function(err, unit) {
            if (err) { 
                return err;
            } else {
                return unit;
            }
        })
    },
    getUnitsOfUnderUnit: (unitId) => {
        Unit.find(function (err, units) {
            if (err) {
                return err; 
            } else {

                var pattern = "^" + unitId + "(_[0-9]+)+$";
                var list = [];
                var regex = new RegExp(pattern);
                var bIsIdExist = false;
                units = JSON.parse(JSON.stringify(units));
                
                // Find if the unit id is existed
                for (var i=0; i<units.length; i++) {
                    if(units[i].id === unitId)
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

                return list;
            }
        });
    },
    updatePatient: (patient) => {
        patient.LastUpdate = new Date().getTime();
        Patient.findByIdAndUpdate(patient.braceletId, {$set: req.params.object}, {new: false}, function (err, patient){
            if (err) { 
                return err;
            } else {
                return patient;
            }
        });
    },
    updateUnit: (unit) => {
        Unit.findByIdAndUpdate(unit.id, {$set: unit}, {new: false}, function (err, unit){
            if (err) { 
                return err;
            } else {
                return unit;
            }
        });
    },
    insertPatient: (patient) => {
        Patient.create(patient, function(err, patient){
            if (err) { 
                return err;
            } 
            else {
                return patient;
            }
        });
    }
};