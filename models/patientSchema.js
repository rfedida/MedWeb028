var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
	braceletId: String,
	CurrentStation: String,
	LastUpdate: Number,
	generalData: {
		emergency: {
			type: Number,
			enum: [0, 1, 2, 3, 4] // 0 - unknwon, not-urgent, urgent, dead, transfer
		},
		breathingHit: Boolean,
		airwayHit: Boolean,
		shock: Boolean,
		injuryMechanism: {
			type: Number,
			enum: [0 ,1 ,2, 3, 4, 5, 6]
		},
		consciousness: {
			type: String,
			enum: ["A", "P", "U", "V"]
		},
		injuryLocation: String,
		comments: String
	},
	treatments: [{
			date: Number,
			treatmentType: {type: Number, enum : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}, // Treatments enum
			location: String,
			bloodPressure: String,
			heartbeat: Number,
			temperature: Number,
			storation: Number
	}],
	medications: [{
		date: Number,
		medicationId: {type: Number, enum: [11, 12, 13, 14, 15, 16]}, // From medications enum
		dosage: Number,
		dosageUnit: String,
		bloodPressure: String,
		heartbeat: Number,
		temperature: Number,
		storation: Number
	}],
	liquids: [{
		date: Number,
		liquidId: {type: Number, enum: [0, 1 ,2]}, // From liquids enum
		dosage: Number,
		dosageUnit: String,
		bloodPressure: String,
		heartbeat: Number,
		temperature: Number,
		storation: Number
	}],
	measurements: {
		temperatures: [{
			timestamp: Number,
			tempreature: Number
		}],
		storations: [{
			timestamp: Number,
			storation: Number
		}],
		bloodPressures: [{
			timestamp: Number,
			bloodPressure: Number
		}],
		heartbeat: [{
			heartbeat: Number,
			timestamp: Number
		}]
	},
	Stations: [{		
		receptionTime: Number,
		stationId: String,
		leavingDate: Number
	}]
}, {collection: 'Patients'});

var Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;