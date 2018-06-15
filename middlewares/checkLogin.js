var constants = require("../configurations/constants.js");
var response_result = require("../models/response_result.js");

module.exports = {
	checkLogin: function checkLogin(req, res, next) {
		if(!req.session.username) {
			var response = response_result(constants.res_login_first, "login first");
			res.send(JSON.stringify(response));
			return;
		}

		next();
	},

	checkNotLogin: function checkLogin(req, res, next) {
		if(req.session.user) {
			return res.redirect('back');
		}

		next();
	}
}