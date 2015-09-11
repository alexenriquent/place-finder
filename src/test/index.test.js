/** Module dependencies */
var app = require('../app');
var http = require('http');
var request = require('supertest');
var should = require('should');

describe('Static Routes', function() {

	describe('GET /', function() {
		it('should return 200', function(done) {
			request(app)
				.get('/')
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should display content as "text/html"', function(done) {
			request(app)
				.get('/')
				.expect('Content-Type', 'text/html; charset=UTF-8')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
	});

	describe('GET /test', function() {
		it('should return 404', function(done) {
			request(app)
				.get('/test')
				.expect(404)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(404);
					done();
				});
		});

		it('should display error as "text/html"', function(done) {
			request(app)
				.get('/test')
				.expect('Content-Type', 'text/html; charset=utf-8')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
	});
});