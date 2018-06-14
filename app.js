var express = require("express");
var app = express();

var path = require("path");
var routes = require("./router/index.js").routes;

// var router = require("./router/router.js");

var session = require('express-session');

// http session configuration
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// templete engine
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
// static resources
app.use(express.static('./publics'));


routes(app);
app.listen(3000);