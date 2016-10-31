var diskdb = require('./dbdiskconnection');

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

    if(diskdb.TempPatients.update(query, dataToBeUpdate, options) == 1) {
        callback(true);
    } 

    callback(false);
}

module.exports = {
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
            name: unit.name,
            Medications: unit.Medications,
            Treatments: unit.Treatments,
            Max_Capacity: unit.Max_Capacity,
            Doctors_num: unit.Doctors_num
        };

        if(diskdb.TempUnits.update(query, dataToBeUpdate, options) == 1) {
            callback(true);
        }

        callback(false);
    },
    insertPatient: (patient) => {
        diskdb.TempPatients.save(patient);
    },
    getTempPatients: (callback) => {
        var TempPatients = diskdb.TempPatients.find();
        for (var i=0; i< TempPatients.length; i++) {
            diskdb.TempPatients.remove({"braceletId":TempPatients[i].braceletId});
        }

        callback(TempPatients);
    },
    getTempUnits: (callback) => {
        var TempUnits = diskdb.TempUnits.find();
        for (var i=0; i< TempUnits.length; i++) {
            diskdb.TempUnits.remove({"id":TempUnits[i].id});
        }
        callback(TempUnits);
    },
    writePatientOrUpdateFromUsb: (p) => {
        updatePatient(p, function(data) {
            if (data)
                console.log("File changed");
        })
    }
};