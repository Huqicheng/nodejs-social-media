var formidable = require("formidable");

var form = new formidable.IncomingForm();


// callback parameters: err, fields, files
exports.parse_form = function(req, callback){
	form.parse(req, function(err, fields, files){
		if (err) {
			console.log("Error: " + err);
			return;
		}

		callback(null, fields, files);
	});
};

