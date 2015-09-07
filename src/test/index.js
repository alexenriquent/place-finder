var app = require('../app');
var http = require('http');
var request = require('supertest');

describe('Routes', function() {

	describe('GET /', function() {
		it('GET / should return 200', function(done) {
			request(app)
				.get('/')
				.expect(200, done);
		});
	});

});