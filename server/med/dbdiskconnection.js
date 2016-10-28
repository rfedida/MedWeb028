var db = require('diskdb');
var path = require('path');

db = db.connect(path.join(__dirname,'../../data'), ['Patients', 'Units']);

module.exports = db;
