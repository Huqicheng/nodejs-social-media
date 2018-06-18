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

router.get("/test_non_parameter", function(req, res, next){
	res.end("hello yehefang");
});

router.post("/updateSettings", middlewares.checkLogin.checkLogin,
			middlewares.body_parser.parse_form, function(req, res, next){

	var response = response_result(constants.success, req.query.fields);
	res.end(JSON.stringify(response));

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


router.post("/register", function(req, res, next){
	async.waterfall(
		[
			// parse form
			function(callback){
				var form = new formidable.IncomingForm()
				form.parse(req, function(err, fields, files){
					callback(null, fields);
				});
			},
			// verify username: existed or not
			function(fields, callback){
				var username = fields.username;
				user_db.findUser(
					{username : username}, 
					function(err, result){
						if (err) {
							return callback(err);
						}

						if (result.length >= 1) {
							return callback(new Error("Username existed."));
						}

						return callback(err,fields);
					},
					{password:0}
				);
			},
			//register
			function(fields, callback){
				var newUser = {
						username: fields.username,
						password: fields.password,
						age : 0,
						logindate : new Date(),
						gender : 0
					};
				user_db.insertOneUser(
					newUser,
					function(err, result){
						return callback(err, newUser);
					}
				)
			}
		],
		function(err, newUser){
			if (err) {
				var response = response_result(constants.failed, err.message);
				res.send(JSON.stringify(response));
				return;
			}

			req.session.username = newUser.username;
			var response = response_result(constants.success, newUser);
			res.send(JSON.stringify(response));
		}
	);
});

router.post("/updatePassword", middlewares.checkLogin.checkLogin, function(req, res, next){
	async.waterfall(
		[
			// parse form
			function(callback){
				var form = new formidable.IncomingForm()
				form.parse(req, function(err, fields, files){
					callback(null, fields);
				});
			},
			// verify user
			function(fields, callback){
				var username = fields.username;
				var password = fields.password;
				var newPassword = fields.newPassword;
				user_db.findUser(
					{username : username, password : password}, 
					function(err, result){
						return callback(err,result,newPassword);
					},
					{password:0}
				);
			},
			// update password
			function(user, newPassword, callback){
				if (user.length != 1) {
					return callback(new Error("The original password is wrong."));
				}
				var username = user[0].username;
				user_db.updateUser(
					{username : username},
					{password : newPassword},
					function(err, result2){
						return callback(err, result2, user[0]);	
					}
				);
			}
		],
		function(err, result, user){
			if (err) {
				var response = response_result(constants.failed, err.message);
				res.send(JSON.stringify(response));
				return;
			} else {
				var response = response_result(constants.success, user);
				res.send(JSON.stringify(response));
			}	
		}
	);
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

router.post("/logout", function(req, res, next){
	req.session.username = null;
	var response = response_result(constants.success);
	res.send(JSON.stringify(response));
});

exports.router = router;