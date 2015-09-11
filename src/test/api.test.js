/**
 * @file Unit test cases for the API routes
 */

/** Module dependencies */
var app = require('../app');
var http = require('http');
var request = require('supertest');
var should = require('should');

/* API routes text cases */
describe('API Routes', function() {

	var location = {
		latitude: -27.471,
		longitude: 153.0243
	};
	var keyword;
	var name;
	var placeID;

	/** HTTP request to the Telize API */
	describe('GET /geolocation', function() {
		it('should return 200', function(done) {
			request(app)
				.get('/geolocation')
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with JSON', function(done) {
			request(app)
				.get('/geolocation')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('should have IP address', function(done) {
			request(app)
				.get('/geolocation')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('ip');
					res.body.ip.should.not.equal(null);
					done();
				});
		});

		it('should have latitude and longitude', function(done) {
			request(app)
				.get('/geolocation')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('latitude');
					res.body.should.have.property('longitude');
					res.body.latitude.should.not.equal(null);
					res.body.longitude.should.not.equal(null);
					done();
				});
		});

		it('should have city name', function(done) {
			request(app)
				.get('/geolocation')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('city');
					res.body.city.should.not.equal(null);
					done();
				});
		});
	});
	
	/** HTTP request to the Open Weather Map API */
	describe('GET /weather/:location', function() {
		it('should return 200', function(done) {
			request(app)
				.get('/weather/' + location.latitude + ',' + location.longitude)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with JSON', function(done) {
			request(app)
				.get('/weather/' + location.latitude + ',' + location.longitude)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('should contain weather description', function(done) {
			request(app)
				.get('/weather/' + location.latitude + ',' + location.longitude)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('weather');
					res.body.weather[0].main.should.not.equal(null);
					res.body.weather[0].description.should.not.equal(null);
					done();
				});
		});

		it('should contain weather information', function(done) {
			request(app)
				.get('/weather/' + location.latitude + ',' + location.longitude)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('main');
					res.body.main.should.not.equal(null);
					res.body.main.temp.should.not.equal(null);
					res.body.main.temp_min.should.not.equal(null);
					res.body.main.temp_max.should.not.equal(null);
					done();
				});
		});
	});

	/** HTTP request to the Flickr API */
	describe('GET /photo/:location', function() {
		keyword = 'brisbane';

		it('should return 200', function(done) {
			request(app)
				.get('/photo/' + location.latitude + ',' + location.longitude
					+ ',' + keyword)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with text/html', function(done) {
			request(app)
				.get('/photo/' + location.latitude + ',' + location.longitude
					+ ',' + keyword)
				.expect('Content-Type', 'text/html; charset=utf-8')
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
	});

	/** HTTP request to the Foursquare API */
	describe('GET /placeinfo/:location', function() {
		it('should return 200', function(done) {
			request(app)
				.get('/placeinfo/' + location.latitude + ',' + location.longitude)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with JSON', function(done) {
			request(app)
				.get('/placeinfo/' + location.latitude + ',' + location.longitude)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('should have place ID', function(done) {
			request(app)
				.get('/placeinfo/' + location.latitude + ',' + location.longitude)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('response');
					res.body.response.should.not.equal(null);
					res.body.response.venues[0].should.not.equal(null);
					res.body.response.venues[0].id.should.not.equal(null);
					done();
				});
		});
	});

	/** HTTP request to the Foursquare API */
	describe('GET /placedata/:id', function() {
		placeID = '4b05873bf964a520848622e3';
		it('should return 200', function(done) {
			request(app)
				.get('/placedata/' + placeID)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with JSON', function(done) {
			request(app)
				.get('/placedata/' + placeID)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('should have basic place data', function(done) {
			request(app)
				.get('/placedata/' + placeID)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('response');
					res.body.response.should.not.equal(null);
					res.body.response.venue.should.not.equal(null);
					res.body.response.venue.name.should.not.equal(null);
					res.body.response.venue.location.formattedAddress.should.not.equal(null);
					done();
				});
		});
	});

	/** HTTP request to the Google Places API */
	describe('GET /place/:location', function() {
		name = 'brisbane';

		it('should return 200', function(done) {
			request(app)
				.get('/place/' + location.latitude + ',' + location.longitude
					+ ',' + name)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.status.should.equal(200);
					done();
				});
		});

		it('should respond with JSON', function(done) {
			request(app)
				.get('/place/' + location.latitude + ',' + location.longitude
					+ ',' + name)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});

		it('should have basic place data', function(done) {
			request(app)
				.get('/place/' + location.latitude + ',' + location.longitude
					+ ',' + name)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						throw err;
					}
					res.body.should.have.property('results');
					res.body.results.should.not.equal(null);
					res.body.results[0].name.should.not.equal(null);
					res.body.results[0].vicinity.should.not.equal(null);
					done();
				});
		});
	});
	
});