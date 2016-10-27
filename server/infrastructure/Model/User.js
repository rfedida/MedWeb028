var mongoose = require('mongoose');
var db = mongoose.connection;

var userSchema = new mongoose.Schema(
{
    userName : "string",
    password : "string",
    role : "string"    
});

var User = mongoose.model("Users", userSchema);

module.exports = User;