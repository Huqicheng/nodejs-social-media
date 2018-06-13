/*
* mongoose: https://www.cnblogs.com/zhongweiv/p/mongoose.html
*/

var mongoose = require('mongoose'),
    DB_URL = require('../configurations/settings.js').dburl;

/**
 * start connecting
 */
mongoose.connect(DB_URL);

/**
  * success on connection
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * error on connection
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * disconnection
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;