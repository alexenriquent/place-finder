/** Module dependencies */
var app = require('../app');
var http = require('http');
var request = require('supertest');
var should = require('should');

describe('API Routes', function() {

	var location = {
		latitude: -27.471,
		longitude: 153.0243
	};
	var keyword;
	var name;
	var placeID;

	describe('GET /geolocation', function() {
		it('GET /geolocation should return 200', function(done) {
			request(app)
				.get('/geolocation')
				.expect(200, done);
		});
	});

	describe('GET /weather/:location', function() {
		it('GET /weather/:location should return 200', function(done) {
			request(app)
				.get('/weather/' + location.latitude + ',' + location.longitude)
				.expect(200, done);
		});
	});

	describe('GET /photo/:location', function() {
		keyword = 'brisbane';
		it('GET /photo/:location should return 200', function(done) {
			request(app)
				.get('/photo/' + location.latitude + ',' + location.longitude
					+ ',' + keyword)
				.expect(200, done);
		});
	});

	describe('GET /placeinfo/:location', function() {
		it('GET /placeinfo/:location should return 200', function(done) {
			request(app)
				.get('/placeinfo/' + location.latitude + ',' + location.longitude)
				.expect(200, done);
		});
	});

	describe('GET /placedata/:id', function() {
		placeID = '4b05873bf964a520848622e3';
		it('GET /placedata/:id should return 200', function(done) {
			request(app)
				.get('/placedata/' + placeID)
				.expect(200, done);
		});
	});

	describe('GET /place/:location', function() {
		name = 'brisbane';
		it('GET /place/:location should return 200', function(done) {
			request(app)
				.get('/place/' + location.latitude + ',' + location.longitude
					+ ',' + name)
				.expect(200, done);
		});
	});
	
});