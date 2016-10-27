var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	UserId: String,
	UserName: String,
	Password: String,
	PermissionID: String
});

var User = new mongoose.model("User", userSchema);

module.exports = User;