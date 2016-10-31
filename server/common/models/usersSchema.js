var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	UserId: String,
	UserName: String,
	Password: String,
	PermissionID: String
}, { collection: "Users"});

var User = mongoose.model("User", userSchema);

module.exports = User;