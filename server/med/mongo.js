var mongoose = require('mongoose');
var Unit = require('../../models/unitSchema');
var Patient = require('../../models/patientSchema');

function getAllCurrentStationById(arrayToSort, currStationId) {

    var onlyCurrentStationArray = [];
    arrayToSort.forEach(function(station) {
        if (station.stationId == currStationId) {
            onlyCurrentStationArray.push(station);
        }
    });
    return onlyCurrentStationArray;
}

function sortDesc(arrayToSort, field){
    var newArray = arrayToSort.sort(function(a,b) {
        return (new Date(b[field]) - new Date(a[field])); 
    });

    return newArray;
}

module.exports = {
    getAllPatients: (callback) => {
        Patient.find(function (err, patients) {
            if (err) {
                callback(err);
            } else {
                callback(patients);
            }
        });
    },
    getPatientByBraceletId: (braceletId, callback) => {
        Patient.findOne({"braceletId" : braceletId}, function(err, patient) {
            if (err) { 
                callback(err);
            } else {
                callback(patient);
            }
        })
    },
    getPatientsByUnitId: (unitId, callback) => {
        Patient.find({"CurrentStation" : unitId},  function(err, patients) {
            if (err) {
                callback(err);
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

                return callback(result);
            }
        });  
    },
    getUnitByUnitId: (unitId, callback) => {
        Unit.findOne({'id' : unitId}, function(err, unit) {
            if (err) { 
                callback(err);
            } else {
                callback(unit);
            }
        })
    },
    getUnitsOfUnderUnit: (unitId, callback) => {
        Unit.find(function (err, units) {
            if (err) {
                callback(err); 
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

                callback(list);
            }
        });
    },
    updatePatient: (patient, callback) => {
        patient.LastUpdate = new Date().getTime();
        Patient.findByIdAndUpdate(patient._id, {$set: patient}, {new: false}, function (err, patient){
            if (err) { 
                callback(err);
            } else {
                callback(patient);
            }
        });
    },
    updateUnit: (unit, callback) => {
        Unit.findByIdAndUpdate(unit.id, {$set: unit}, {new: false}, function (err, unit){
            if (err) { 
                callback(err);
            } else {
                callback(unit);
            }
        });
    },
    insertPatient: (patient, callback) => {
        Patient.create(patient, function(err, patient){
            if (err) { 
                callback(err);
            } else {
                callback(patient);
            }
        });
    },
    updatePatientsAfterConnection: (tempPatients, callback) => {
        for (var i=0; i<tempPatients.length; i++) {
            Patient.findOne({"braceletId" : tempPatients[i].braceletId}, function(err, patient) {
                if (err) {
                    // Insert to db
                    callback(err);
                } else {
                    // check if data need to update according timestamps
                    if (tempPatients[i].LastUpdate > patient.LastUpdate) {

                    }
                    callback(patient);
                }
            })
        }
    },
    updateUnitsAfterConnection: (tempUnits, callback) => {
        for (var i=0; i<tempUnits.length; i++) {

        }
    },
    getAllCurrentStationById: getAllCurrentStationById,
    sortDesc: sortDesc
};