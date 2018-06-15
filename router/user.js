var router = require("express").Router();
var async = require("async");
var formidable = require("formidable");

var user_db = require("../models/user.js");
var md5 = require("../models/md5.js");
var response_result = require("../models/response_result.js");
var post_form_utils = require("../utils/post_form_utils.js");
var constants = require("../configurations/constants.js");

var middlewares = require("../middlewares")
// /user/      to get user information. 
// just for testing
router.get("/", middlewares.checkLogin.checkLogin,function(req, res, next) {
	let username = req.query.username;
	user_db.findUser({username:username}, function(err, result){
		console.log(username)
		if (err) {
			var response = response_result(constants.failed, null);
			res.end(JSON.stringify(response));
			return;
		}
		var response = response_result(constants.success, result);
		res.end(JSON.stringify(response));
		

	});
});

router.post("/setAvatar", middlewares.checkLogin.checkLogin, function(req, res, next){
	var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../updates/avatars");
    form.parse(req, function (err, fields, files) {
        console.log(files);
        var oldpath = files.avatar.path;
        var newpath = form.uploadDir + "/" + req.session.username + ".jpg";
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                var response = response_result(constants.failed, err);
				res.end(JSON.stringify(response));
                return;
            }
            req.session.avatar = req.session.username + ".jpg";
            var response = response_result(constants.success, null);
			res.end(JSON.stringify(response));
        });
    });
});

router.post("/updatePassword", middlewares.checkLogin.checkLogin, function(req, res, next){
	async.waterfall(
		[
		
		])
});

router.post("/login",function(req, res, next) {
	// using aysnc.waterfall to handle the waterfall series
	async.waterfall(
		[
			function(next){
				var form = new formidable.IncomingForm()
				form.parse(req, function(err, fields, files){
					next(null, fields);
				});
			},

			function(fields, next){
				var username = fields.username;
				var password = fields.password;
				user_db.findUser(
					{username : username, password : password}, 
					function(err, result){
						return next(err,result);
					},
					{password:0}
				);
			},

			function(result, next){
				if (result.length != 1) {
					return next(new Error("Login Failed"));
				}
				var username = result[0].username;
				user_db.updateUser(
					{username : username},
					{logindate : new Date()},
					function(err, result2){
						return next(err, result2, result[0]);	
					}
				);
			}
		],
		function(err, result, user) {
			if (err) {
				var response = response_result(constants.failed, err.message);
				res.send(JSON.stringify(response));
			} else {
				// keep the session status as signed in 
				req.session.username = user.username;
				var response = response_result(constants.success, user);
				res.send(JSON.stringify(response));
			}	
		}
	);
	
});// router.post




exports.router = router;