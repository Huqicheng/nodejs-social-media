/**
* Module Name: models.md5
*
* @description: md5 encoding
*
* @author huqicheng
* @version 1.0
*/
var crypto = require("crypto");
var md5 = function(mingma){
    var md5 = crypto.createHash('md5');
    var password = md5.update(mingma).digest('base64');
    return password;
}

module.exports = function(mingma) {
	return md5(md5(mingma) + "social_media");
}