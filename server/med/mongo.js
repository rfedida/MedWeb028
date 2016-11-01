var mongoose = require('mongoose');
var Unit = require('../common/models/unitSchema');
var Patient = require('../common/models/patientSchema');

function updatePatient(patient, callback) {
    if (patient._id !== undefined || patient._id !== null) {
        delete patient._id;
    }
    patient.LastUpdate = new Date().getTime();
    Patient.update({"braceletId":patient.braceletId}, {$set: patient}, {new: false}, function (err, patient){
        if (err) { 
            callback(err);
        } else {
            callback(patient);
        }
    });
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
    getAllUnits: (callback) => {
        Unit.find(function (err, units) {
            if (err) {
                callback(err);
            } else {
                callback(units);
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
                    var newPatient = {};
                    newPatient.braceletId = patient.braceletId;
                    newPatient.status = patient.generalData.emergency;
                    newPatient.measurements = {};
                    newPatient.Stations = {};
                    if (patient.measurements.temperatures !== undefined && patient.measurements.temperatures.length > 0) {
                        newPatient.measurements.temperatures = sortDesc(patient.measurements.temperatures, "timestamp")[0];
                    }
                    if (patient.measurements.storations !== undefined && patient.measurements.storations.length > 0) {
                        newPatient.measurements.storations = sortDesc(patient.measurements.storations, "timestamp")[0];
                    }
                    if (patient.measurements.bloodPressures !== undefined && patient.measurements.bloodPressures.length > 0) {
                        newPatient.measurements.bloodPressures = sortDesc(patient.measurements.bloodPressures, "timestamp")[0];
                    }
                    if (patient.measurements.heartbeat !== undefined && patient.measurements.heartbeat.length > 0) {
                        newPatient.measurements.heartbeat = sortDesc(patient.measurements.heartbeat, "timestamp")[0];
                    }
                    if (patient.Stations !== undefined && patient.Stations.length > 0) {
                        newPatient.Stations.receptionTime = sortDesc(patient.Stations, "receptionTime")[0].receptionTime ;
                    }
                    
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

                var pattern = "^" + unitId + "[_\d]{1}[0-9]+$";
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
    updatePatient: updatePatient,
    updateUnit: (unit, callback) => {
        Unit.update({"id":unit.id}, {$set: unit}, {new: false}, function (err, unit){
            if (err) { 
                callback(err);
            } else {
                callback(unit);
            }
        });
    },
    insertPatient: (patient, callback) => {
        if (patient._id !== undefined || patient._id !== null) {
            delete patient._id;
        }
        var newP = new Patient(patient);
        newP.save(function(err) {
            if (err) {
                callback(err);
            } else {
                callback(newP);
            }
        })
    },
    updatePatientAfterConnection: (p) => {
        Patient.findOne({"braceletId" : p.braceletId}, function(err, patient) {
            if (p._id !== undefined || p._id !== null) {
                delete p._id;
            }   
            if (err || patient == null) {
                var newP = new Patient(p);
                newP.save(function(err) {
                    if (!err) { 
                        console.log("Insert db")
                    } 
                })
            } else {
                // check if data need to update according timestamps
                if (p.LastUpdate > patient.LastUpdate) {
                    Patient.update({"braceletId":p.braceletId}, {$set: p}, {new: false}, function (err, patient){
                        if (!err) { 
                            console.log("Update db");
                        }
                    });
                }
            }
        })
    },
    updateUnitAfterConnection: (u) => {
        Unit.findOne({'id' : u.id}, function(err, unit) {
            if (u._id !== undefined || u._id !== null) {
                delete u._id;
            }   
            if (err) { 
                // insert
                var newU = new Unit(u);
                newU.save(function(err) {
                    if (!err) {
                        console.log("Insert db");
                    }
                })
            } else {
                Unit.update({"id":u.id}, {$set: u}, {new: false}, function (err, unit){
                    if (!err) { 
                        console.log("Update db")
                    }
                });
            }
        })
    },
    getAllCurrentStationById: getAllCurrentStationById,
    sortDesc: sortDesc,
    writePatientOrUpdateFromUsb: function(p) {
        Patient.findOne({"braceletId" : p.braceletId}, function(err, patient) {
            if (p._id !== undefined || p._id !== null) {
                delete p._id;
            }
            if (err || patient == null) {
                pNew = new Patient(p);
                pNew.save(function(err) {
                    if (!err) { 
                        console.log("Insert db")
                    } 
                });
            } else {
                // check if data need to update according timestamps
                if (p.LastUpdate > patient.LastUpdate) {
                    Patient.update({"braceletId": patient.braceletId}, {$set: p}, {new: false}, function (err, patient){
                        if (!err) { 
                            console.log("Update db");
                        }
                    });
                }
            }
        })
    }
};