
exports.routes = function(app){
	app.use("/user", require("./user.js").router);
}
