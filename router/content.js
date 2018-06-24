var router = require("express").Router();
var async = require("async");
var formidable = require("formidable");
var response_result = require("../models/response_result.js");
var content = require("../models/content.js");
var constants = require("../configurations/constants.js");
var middlewares = require("../middlewares")
// /user/      to get user information. 
// just for testing
router.get("/", function(req, res, next) {
	let path = "./uploads/contents/"+req.query.content_filename;
	content.md2HTML(path, function(err, html){
		console.log(html)
		if (err) {
			var response = response_result(constants.failed, err.message);
			res.end(JSON.stringify(response));
			return;
		}
		var response = response_result(constants.success, html);
		res.end(JSON.stringify(response));
		

	});
});



exports.router = router;