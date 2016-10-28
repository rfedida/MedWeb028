var mongoose = require("mongoose");

var unitSchema = new mongoose.Schema({
	id: String,
	name: String,
	Medications: [{
		id: String,
		Standard: Number,
		Stock: Number
	}],
	Treatments: [{
		id: String,
		Standard: Number,
		Stock: Number
	}],
	Max_Capacity: Number,
	Doctors_num: Number,
	//location: {
		 //type: Point,
		 //coordinates: [0, 1]} 
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
