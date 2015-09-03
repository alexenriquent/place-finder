// Import the 'request' module
var request = require('request');

module.exports = {

	geolocation: function(req, res) {
		var url = 'http://www.telize.com/geoip';

		request(url, function(error, response, body) {
			if (error) {
				return console.log('Error: ', error);
			}
			if (response.statusCode !== 200) {
				return console.log('Invalid status code: ', response.statusCode);
			}
			var info = JSON.parse(body);
				res.send(info);
		});
	}
};