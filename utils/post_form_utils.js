var formidable = require("formidable");

var form = new formidable.IncomingForm();


// callback parameters: err, fields, files
exports.parse_form = function(callback){
	form.parse(req, callback);
};

