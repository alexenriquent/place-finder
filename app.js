// Import modules
var express = require('express');
var ejs = require('ejs');
var logger = require('morgan');
var routes = require('./routes/index');
var api = require('./routes/api')

// Create an 'express' object
var app = express();

// Use Morgan - Log requests to the terminal console
app.use(logger('dev'));
// Add connection to the 'views' folder for css and javascipt
app.use(express.static(__dirname + '/views'));
// Add connection to the 'public' folder for html
app.use(express.static(__dirname + '/public'));
// Set EJS as a templating language with HTML as an extension
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// Static route
app.get('/', routes.index);

// API routes
app.get('/geolocation', api.geolocation);
app.get('/weather/:location', api.weather);
app.get('/photo/:location', api.photo);
app.get('/placeinfo/:location', api.placeInfo);
app.get('/placedata/:id', api.placeData);

// Catch 404 and forward to rror handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Development error handler
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// Export 'app' module
module.exports = app;
