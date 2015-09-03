// Import modules
var http = require('http');
var app = require('./app');

// Identify port
var port = process.env.PORT || 8080;

// Create a server and log a message to the console
http.createServer(app).listen(port, function() {
	console.log('Listening on port ' + port);
});