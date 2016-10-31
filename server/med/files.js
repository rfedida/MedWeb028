var diskdb = require('./dbdiskconnection');

function sortArrayByLastTimestamp(arrayToSort) {
    var newArray = arrayToSort.sort(function(a,b) {
        return parseFloat(b.timestamp) - parseFloat(a.timestamp); 
    });

    return newArray;
}

module.exports = {
    getAllPatients: (callback) => {
        callback(diskdb.Patients.find());
    },
    getUnitByUnitId: (unitId, callback) => {
        callback(diskdb.Units.findOne({id: unitId}));
    },
    getPatientByBraceletId: (braceletId, callback) => {
        callback(diskdb.Patients.findOne({Bracelet_id: braceletId}));
    },
    getPatientsByUnitId: (unitId, callback) => {
        var list = [];
        var patients = db.Patients.find()
        for (var i=0; i<patients.length; i++) {
            if (patients[i].CurrentStation===unitId) {
                var p = {
                    Bracelet_id: patients[i].Bracelet_id,
                    IsDead: patients[i].IsDead,
                    CurrentStation: patients[i].CurrentStation,
                    General_Data: patients[i].General_Data,
                    Treatments: patients[i].Treatments,
                    Medications: patients[i].Medications,
                    Liquids: patients[i].Liquids,
                    Stations: patients[i].Stations,
                    Measurements: {}
                };

                var last = patients[i].Measurements.Temperatures[0];
                for(var a=1; a < patients[i].Measurements.Temperatures.length; a++) {
                    if (patients[i].Measurements.Temperatures[a].Timestamp > last.Timestamp) {
                        last = patients[i].Measurements.Temperatures[a];
                    }
                }
                p.Measurements.Temperatures = last;

                last = patients[i].Measurements.Storations[0];
                for(var a=1; a < patients[i].Measurements.Storations.length; a++) {
                    if (patients[i].Measurements.Storations[a].Timestamp > last.Timestamp) {
                        last = patients[i].Measurements.Storations[a];
                    }
                }
                p.Measurements.Storations = last;

                last = patients[i].Measurements.Bloodpressures[0];
                for(var a=1; a < patients[i].Measurements.Bloodpressures.length; a++) {
                    if (patients[i].Measurements.Bloodpressures[a].Timestamp > last.Timestamp) {
                        last = patients[i].Measurements.Bloodpressures[a];
                    }
                }
                p.Measurements.Bloodpressures = last;

                last = patients[i].Measurements.Heartbeat[0];
                for(var a=1; a < patients[i].Measurements.Heartbeat.length; a++) {
                    if (patients[i].Measurements.Heartbeat[a].Timestamp > last.Timestamp) {
                        last = patients[i].Measurements.Heartbeat[a];
                    }
                }
                p.Measurements.Heartbeat = last;

                list.push(p);
            }
        }

        callback(list);
    },
    getUnitsOfUnderUnit: (unitId, callback) => {
        var list = [];
        var units = db.Units.find();
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
    updatePatient: (patient, callback) => {
        var options = {
            multi: false,
            upsert: true
        };
        
        var query = {
            Bracelet_id: patient.Bracelet_id
        };

        var dataToBeUpdate = {
            Bracelet_id: patient.Bracelet_id,
            LastUpdate: new Date().getTime(),
            IsDead: patient.IsDead,
            CurrentStation: patient.CurrentStation,
            General_Data: patient.General_Data,
            Treatments: patient.Treatments,
            Medications: patient.Medications,
            Liquids: patient.Liquids,
            Measurements: patient.Measurements,
            Stations: patient.Stations
        };

        if(db.Patients.update(query, dataToBeUpdate, options) == 1) {
            callback(true);
        } 

        callback(false);
    },
    updateUnit: (unit, callback) => {
        var options = {
            multi: false,
            upsert: true
        };
        
        var query = {
            id: unit.id
        };

        var dataToBeUpdate = {
            name: unit.name,
            Medications: unit.Medications,
            Treatments: unit.Treatments,
            Max_Capacity: unit.Max_Capacity,
            Doctors_num: unit.Doctors_num,
            location: unit.location
        };

        if(db.Units.update(query, dataToBeUpdate, options) == 1) {
            callback(true);
        }

        callback(false);
    },
    insertPatient: (patient) => {
        diskdb.Patients.save(patient);
    }
};