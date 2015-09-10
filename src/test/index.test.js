/** Module dependencies */
var app = require('../app');
var http = require('http');
var request = require('supertest');

describe('Static Routes', function() {

	describe('GET /', function() {
		it('GET / should return 200', function(done) {
			request(app)
				.get('/')
				.expect(200, done);
		});
	});

	describe('GET /test', function() {
		it('GET /test should return 404', function(done) {
			request(app)
				.get('/test')
				.expect(404, done);
		});
	});
});