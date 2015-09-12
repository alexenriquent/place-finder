/**
 * @file Create HTTP server
 */

/** Module dependencies */
var http = require('http');
var app = require('./app');

/** Identify port from environment */
var port = process.env.PORT || 80;

/** Create a server and log a message to the console */
http.createServer(app).listen(port, function() {
	console.log('Listening on port ' + port);
});