var mongoose = require("mongoose");

var unitSchema = new mongoose.Schema({
	id: String,
	name: String,
	Medications: [{
		id: String,
		Standard: Number,
		Stock: {
			CurrStock: Number,
			Usage: [Number]
		}
	}],
	Treatments: [{
		id: String,
		Standard: Number,
		Stock: {
			CurrStock: Number,
			Usage: [Number]
		}
	}],	
	Max_Capacity: Number,
	Doctors_num: Number
	// location: { type: Point, coordinates: [Number]} ?
}, {collection: 'Units'});

var Unit = mongoose.model('Units', unitSchema);

module.exports = Unit;
