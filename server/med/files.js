var diskdb = require('./dbdiskconnection');

function sortArrayByLasttimestamp(arrayToSort) {
    var newArray = arrayToSort.sort(function(a,b) {
        return parseFloat(b.timestamp) - parseFloat(a.timestamp); 
    });

    return newArray;
}

function updatePatient(patient, callback) {
        var options = {
            multi: false,
            upsert: true
        };
        
        var query = {
            braceletId: patient.braceletId
        };

        var dataToBeUpdate = {
            braceletId: patient.braceletId,
            LastUpdate: new Date().getTime(),
            CurrentStation: patient.CurrentStation,
            generalData: patient.generalData,
            treatments: patient.treatments,
            medications: patient.medications,
            liquids: patient.liquids,
            measurements: patient.measurements,
            Stations: patient.Stations
        };

        if(diskdb.Patients.update(query, dataToBeUpdate, options) == 1) {
            callback(true);
        } 

        callback(false);
}

function insertUnit(unit) {
    diskdb.Units.save(unit);
}

module.exports = {
    getAllPatients: (callback) => {
        callback(diskdb.Patients.find());
    },
    getUnitByUnitId: (unitId, callback) => {
        callback(diskdb.Units.findOne({id: unitId}));
    },
    getPatientByBraceletId: (braceletId, callback) => {
        callback(diskdb.Patients.findOne({braceletId: braceletId}));
    },
    getPatientsByUnitId: (unitId, callback) => {
        var list = [];
        var patients = diskdb.Patients.find()
        for (var i=0; i<patients.length; i++) {
            if (patients[i].CurrentStation===unitId) {
                var p = {
                    braceletId: patients[i].braceletId,
                    CurrentStation: patients[i].CurrentStation,
                    generalData: patients[i].generalData,
                    treatments: patients[i].treatments,
                    medications: patients[i].medications,
                    liquids: patients[i].liquids,
                    Stations: patients[i].Stations,
                    measurements: {}
                };

                var last = patients[i].measurements.temperatures[0];
                for(var a=1; a < patients[i].measurements.temperatures.length; a++) {
                    if (patients[i].measurements.temperatures[a].timestamp > last.timestamp) {
                        last = patients[i].measurements.temperatures[a];
                    }
                }
                p.measurements.temperatures = last;

                last = patients[i].measurements.storations[0];
                for(var a=1; a < patients[i].measurements.storations.length; a++) {
                    if (patients[i].measurements.storations[a].timestamp > last.timestamp) {
                        last = patients[i].measurements.storations[a];
                    }
                }
                p.measurements.storations = last;

                last = patients[i].measurements.bloodPressures[0];
                for(var a=1; a < patients[i].measurements.bloodPressures.length; a++) {
                    if (patients[i].measurements.bloodPressures[a].timestamp > last.timestamp) {
                        last = patients[i].measurements.bloodPressures[a];
                    }
                }
                p.measurements.bloodPressures = last;

                last = patients[i].measurements.heartbeat[0];
                for(var a=1; a < patients[i].measurements.heartbeat.length; a++) {
                    if (patients[i].measurements.heartbeat[a].timestamp > last.timestamp) {
                        last = patients[i].measurements.heartbeat[a];
                    }
                }
                p.measurements.heartbeat = last;

                list.push(p);
            }
        }

        callback(list);
    },
    getUnitsOfUnderUnit: (unitId, callback) => {
        var list = [];
        var units = diskdb.Units.find();
        var pattern = "^" + unitId + "(_[0-9]+)+$";
        var regex = new RegExp(pattern);
        var bIsIdExist = false;

        for (var i=0; i<units.length; i++) {
            if(units[i].id === unitId)
                bIsIdExist = true;
        }

        if (bIsIdExist) {
            for (var i=0; i<units.length; i++) {
                if (regex.test(units[i].id))
                    list.push(units[i]);
            }
        }

        callback(list);
    },
    updatePatient: updatePatient,
    updateUnit: (unit, callback) => {
        var options = {
            multi: false,
            upsert: true
        };
        
        var query = {
            id: unit.id
        };

        var dataToBeUpdate = {
            id: unit.id,
            name: unit.name,
            Medications: unit.Medications,
            Treatments: unit.Treatments,
            Max_Capacity: unit.Max_Capacity,
            Doctors_num: unit.Doctors_num,
            location: unit.location
        };

        if(diskdb.Units.update(query, dataToBeUpdate, options)) {
            callback(true);
        } else {
            callback(false);
        }
    },
    insertPatient: (patient) => {
        diskdb.Patients.save(patient);
    },
    insertUnit: insertUnit,
    writePatientOrUpdateFromUsb: (p) => {
        updatePatient(p, function(data) {
            if (data)
                console.log("File changed");
        })
    }
};