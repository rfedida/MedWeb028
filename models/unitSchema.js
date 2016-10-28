var mongoose = require("mongoose");

var unitSchema = new mongoose.Schema({
	id: String,
	name: String,
	medications: [{
		id: String,
		standard: Number,
		stock: Number
	}],
	treatments: [{
		id: String,
		standard: Number,
		stock: Number
	}],
	maxCapacity: Number,
	doctorsCount: Number
	// location: { type: Point, coordinates: [Number]} ?
}, {collection: 'Units'});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
