var app = require('../app');
var http = require('http');
var request = require('supertest');
var should = require('should');

describe('API Routes', function() {

	describe('GET /geolocation', function() {
		it('GET /geolocation should return 200', function(done) {
			request(app)
				.get('/geolocation')
				.expect(200, done);
		});
	});
	
});