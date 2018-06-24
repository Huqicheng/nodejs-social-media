
exports.routes = function(app){
	app.use("/user", require("./user.js").router);
	app.use("/content", require("./content.js").router);
}
