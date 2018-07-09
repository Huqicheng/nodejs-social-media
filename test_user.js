var user = require("./models/user.js");

var userObj1 = {
	username : "hqc",
	password : "dfhidfhid",
	age : 10,
	logindate : new Date(),
	gender : 0

};

var userObj2 = {
    username : "fangyh",
    password : "123456",
    age : 10,
    logindate : new Date(),
    gender : 0

};
/*
user.insertOneUser(userObj1, function(err, result){
	console.log(result);
});
*/
user.insertOneUser(userObj2, function(err, result){
    console.log(result);
});