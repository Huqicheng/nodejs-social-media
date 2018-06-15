var formidable = require("formidable");

module.exports = {
	parse_form: function (req, res, next) {
		var form = new formidable.IncomingForm()
		form.parse(req, function(err, fields, files){
			if (err) {
				throw Error("form parser error.");
				return;
			}

			req.query.fields = fields;
			
			next();

		});

		
	},

	
}