var router = require("express").Router();
var user_db = require("../models/user.js");
// /user/      to get user information
router.get("/",function(req, res, next) {
	console.log("/");
	let username = req.query.username;
	user_db.findUser({username:username}, function(err, result){
		if (err) {
			res.end();
			return;
		}
		console.log(result);
		res.end(JSON.stringify(result));

	});
});


exports.router = router;