var user = require("./models/user.js");

var userObj = {
	username : "hqc",
	password : "dfhidfhid",
	age : 10,
	logindate : new Date(),
	gender : 0

};

user.insertOneUser(userObj, function(err, result){
	console.log(result);
});