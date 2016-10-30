var diskdb = require('./dbdiskconnection');

module.exports = {
    updatePatient: (patient) => {
        var options = {
            multi: false,
            upsert: false
        };
        
        var query = {
            Bracelet_id: patient.Bracelet_id
        };

        var dataToBeUpdate = {
            Bracelet_id: patient.Bracelet_id,
            IsDead: patient.IsDead,
            CurrentStation: patient.CurrentStation,
            General_Data: patient.General_Data,
            Treatments: patient.Treatments,
            Medications: patient.Medications,
            Liquids: patient.Liquids,
            Measurements: patient.Measurements,
            Stations: patient.Stations
        };

        if(db.TempPatients.update(query, dataToBeUpdate, options) == 1) {
            return true;
        } 

        return false;
    },
    updateUnit: (unit) => {
        var options = {
            multi: false,
            upsert: false
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

        if(db.TempUnits.update(query, dataToBeUpdate, options) == 1) {
            return true;
        }

        return false;
    },
    insertPatient: (patient) => {
        diskdb.TempPatients.save(patient);
    }
};