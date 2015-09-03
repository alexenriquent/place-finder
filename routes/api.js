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
	},

	weather: function(req, res) {
		var params = req.params.location.split(',');
		var position = {latitude: params[0], longitude: params[1]};
		var key = '5e2107b0ce1ca798d76e32f41dcc81fe'; 
		var url = "http://api.openweathermap.org/data/2.5/weather?lat='" 
        		+ position.latitude + "'&lon='" + position.longitude 
        		+ "'&APPID=" + key;

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
	},

	flickr: function(req, res) {
		var params = req.params.location.split(',');
		var position = {latitude: params[0], longitude: params[1]};
		var keyword = params[2];
		var key = '34b0b3186145bc89472de08424c099f7';
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search" 
                + "&api_key=" + key + "&lat=" + position.latitude + "&lon=" 
                + position.longitude + "&accuracy=1&tags=" + keyword 
                + ",bw&sort=relevance&extras=url_l&format=json";

        res.send(url);
	}
};


