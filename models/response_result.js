/**
* Module Name: models.response_result
*
* @description: definition of results of reponses
*
* @author huqicheng
* @version 1.0
*/

module.exports = function(statusCode, body) {
	return {
		statusCode : statusCode,
		body : body
	};
}