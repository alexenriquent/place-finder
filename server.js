var http = require('http');
var express = require('express');
var ejs = require('ejs');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
	res.render('index.html', { });
});

http.createServer(app).listen(port, function() {
	console.log('Listening on port ' + port);
});
