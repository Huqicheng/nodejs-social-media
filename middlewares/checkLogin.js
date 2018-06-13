module.exports = {
	checkLogin: function checkLogin(req, res, next) {
		console.log(req.url);
		if(!req.session.user) {
			res.end("300");
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