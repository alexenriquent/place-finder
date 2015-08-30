// Import modules
var http = require('http');
var express = require('express');
var ejs = require('ejs');
var logger = require('morgan');

// Import a module from 'routes'
var routes = require('./routes/index');

// Create an 'express' object
var app = express();

// Identify port
var port = process.env.PORT || 8080;

// Use Morgan - Log requests to the terminal console
app.use(logger('dev'));
// Add connection to the 'views' folder for css and javascipt
app.use(express.static(__dirname + '/views'));
// Add connection to the 'public' folder for html
app.use(express.static(__dirname + '/public'));
// Set EJS as a templating language with HTML as an extension
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// Route for 'index.html'
app.get('/', routes.index);

// Create a server and log a message to the console
http.createServer(app).listen(port, function() {
	console.log('Listening on port ' + port);
});
