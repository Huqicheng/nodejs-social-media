var showdown  = require('showdown'),
	fs = require('fs'),
    converter = new showdown.Converter();
   
md2HTML = function(path, callback) {
	fs.readFile(path, function(err, data) {
		if (err) {
			return callback(err);
		}
		let html = converter.makeHtml(data.toString());
		callback(err, html);
	});
}

if (require.main === module) {
	md2HTML("./test.md", function(err, html){
		console.log(html);
	});
} else {
	exports.md2HTML = md2HTML;
}

