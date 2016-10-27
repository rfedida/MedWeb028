var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
	braceletId: Number,
	CurrentStation: String,
	LastUpdate: Date,
	generalData: {
		emergency: {
			type: Number,
			enum: [0, 1, 2, 3] // 0 - unknwon, not-urgent, urgent, dead
		},
		breathingHit: Boolean,
		airwayHit: Boolean,
		shock: Boolean,
		injuryMechanism: {
			type: String,
			enum: []
		},
		consciousness: {
			type: String,
			enum: ["A", "P", "U", "V"]
		},
		injuryLocation: String
	},
	treatments: [{
			date: {type: Date, default: Date.now},
			treatmentType: {type: Number, enum : [0, 1, 2 , 3, 4, 5, 6, 7, ,8]}, // Treatments enum
			location: String,
			bloodPressure: String,
			heartbeat: Number,
			temperature: Number,
			storation: Number
	}],
	medications: [{
		date: {type: Date, default: Date.now},
		medicationId: {type: Number, enum: [0, 1, 2, 3, 4, 5]}, // From medications enum
		dosage: Number,
		dosageUnit: String,
		bloodPressure: String,
		heartbeat: Number,
		temperature: Number,
		storation: Number
	}],
	liquids: [{
		date: {type: Date, default: Date.now},
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
		receptionTime: {type: Date, default: Date.now},
		stationId: String,
		leavingDate: {type: Date}
	}]
}, {collection: 'Patients'});

var Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;