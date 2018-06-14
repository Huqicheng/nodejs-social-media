var router = require("express").Router();
var async = require("async")

var user_db = require("../models/user.js");
var md5 = require("../models/md5.js");
var response_result = require("../models/response_result.js");
var post_form_utils = require("../utils/post_form_utils.js");
var constants = require("../configurations/constants.js");

// /user/      to get user information. 
// just for testing
router.get("/",function(req, res, next) {
	let username = req.query.username;
	user_db.findUser({username:username}, function(err, result){
		if (err) {
			var response = response_result(constants.failed, null);
			res.end(JSON.stringify(response));
			return;
		}
		var response = response_result(constants.success, result);
		res.end(JSON.stringify(response));
		

	});
});

router.post("/setAvatar", function(req, res, next){
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

router.post("/login",function(req, res, next) {
	// using aysnc.waterfall to handle the waterfall series
	async.waterfall(
		[
			function(callback){
				post_form_utils.parse_form(req, function(err, fields, files){
					if (err) {
						callback(err);
						return;
					}

					callback(null, fields);
				});
			},

			function(fields, callback){
				var username = fields.username;
				var password = fields.password;
				console.log(username + "," + password);
				user_db.findUser(
					{username:username, password:password}, 
					function(err, result){
						if (err) {
							callback(err);
							return;
						}

						callback(null,result);
					}
				);
			},

			function(result, callback){
				if (result.length != 1) {
					callback(new Error("Login Failed"));
					return;
				}
				var username = result[0].username;
				user_db.updateUser(
					{username : username},
					{logindate : new Date()},
					function(err, result){
						if (err) {
							callback(err);
							return;
						}
						callback(null, result, username);	
					}
				);
			}
		],
		function(err, result, username) {
			if (err) {
				var response = response_result(constants.failed, err);
				console.log(response);
				res.end(JSON.stringify(response));
				return;
			}

			// keep the session status as signed in 
			req.session.username = username;
			var response = response_result(constants.success, null);
			console.log(response);
			res.end(JSON.stringify(response));

		}
	);
	
});// router.post

// /user/login  login interface {username,password}
// router.post("/login",function(req, res, next) {
	
// 	post_form_utils.parse_form(
// 		req, 
// 		function(err, fields, files){
// 			if (err) {
// 				var response = response_result(constants.failed, null);
// 				res.end(JSON.stringify(response));
// 				return;
// 			}
// 			var username = fields.username;
// 			var password = fields.password;

// 			// check if it's existed
// 			// var md5_pwd = md5(password);

// 			user_db.findUser({username:username, password:password}, function(err, result){
// 				if (err) {
// 					var response = response_result(constants.failed, null);
// 					res.end(JSON.stringify(response));
// 					return;
// 				}
// 				if (result.length != 1) {
// 					var response = response_result(constants.failed, null);
// 					res.end(JSON.stringify(response));
// 					return;
// 				}
// 				// update logindate
// 				user_db.updateUser(
// 					{username : username},
// 					{logindate : new Date()},
// 					function(err, result){
// 						if (err) {
// 							var response = response_result(constants.failed, null);
// 							res.end(JSON.stringify(response));
// 							return;
// 						}
// 						// keep the session status as signed in 
// 						req.session.username = username;
// 						var response = response_result(constants.success, null);
// 						res.end(JSON.stringify(response));
						
// 					}
// 				);// user_db.updateUser
// 			});// user_db.findUser
// 		});// parse_form
// });// router.post


exports.router = router;