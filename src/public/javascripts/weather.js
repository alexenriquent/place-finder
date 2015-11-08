/**
 * @file Geolocation and weather data
 */

var currentWeatherData = {
	city: document.getElementById('city-name'),
	weather: document.getElementById('weather-description'),
	currentTemp: document.getElementById('temperature'),
	minTemp: document.getElementById('min-temp'),
	maxTemp: document.getElementById('max-temp'),
	currentTempValue: 0,
	minTempValue: 0,
	maxTempValue: 0,
	unit: '°C'
};

/**
 * Get geolocation and weather data including 
 * a photo retrieved from Flickr
 */
function getGeolocationAndWeather() {
	getGeolocation();
}

/**
 * Get geolocation data from the IP-API server
 */
function getGeolocation() {
	var url = 'http://ip-api.com/json';
	var position = {latitude: 0, longitude: 0};

	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = JSON.parse(xmlhttp.responseText);

			position.latitude = response.lat;
			position.longitude = response.lon;
			currentWeatherData.city.innerHTML = response.city;

			getWeather(position.latitude, position.longitude);
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch the geolocation data from IP-API');
	}
}

/**
 * Get weather information from the server
 * @param {Number} latitude - Geographic cooridinate (latitude)
 * @param {Number} longitude - Geographic cooridinate (longitude)
 */
function getWeather(latitude, longitude) {
 	var param = latitude + ',' + longitude;
 	var url = '/weather/' + param;

    if (window.XMLHttpRequest) {
    	var xmlhttp = new XMLHttpRequest();
    	xmlhttp.addEventListener('load', function() {
    		var response = JSON.parse(xmlhttp.responseText);
    		var weatherDescription;

    		currentWeatherData.currentTempValue = kelvinToCelsius(response.main.temp);
    		currentWeatherData.minTempValue = kelvinToCelsius(response.main.temp_min);
    		currentWeatherData.maxTempValue = kelvinToCelsius(response.main.temp_max);
    		currentWeatherData.currentTemp.innerHTML = 
    		currentWeatherData.currentTempValue + currentWeatherData.unit;
    		currentWeatherData.weather.innerHTML = response.weather[0].description;
    		currentWeatherData.minTemp.innerHTML = 'Min: ' +
    		currentWeatherData.minTempValue + currentWeatherData.unit;
    		currentWeatherData.maxTemp.innerHTML = 'Max: ' +
    		currentWeatherData.maxTempValue + currentWeatherData.unit;

    		weatherDescription = response.weather[0].main;
    		getBackground(latitude, longitude, weatherDescription);
    	}, false);

    	xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
    } else {
    	alert('Unable to fetch the geolocation data from Open Weather Map');
    }
}

/**
 * Convert temperature unit from Kelvin to Celsius
 * @param {Number} kelvin - Temperature in Kelvin
 * @return {Number} Converted value in Celsius 
 */
function kelvinToCelsius(kelvin) {
	return (kelvin - 273.15).toFixed(2);
}

/**
 * Get background image from Flickr
 * @param {Number} latitude - Geographic cooridinate (latitude)
 * @param {Number} longitude - Geographic cooridinate (longitude)
 * @param {String} keyword - Weather description
 */
function getBackground(latitude, longitude, keyword) {
	var script = document.createElement('script');
	var params = latitude + ',' + longitude + ',' + keyword;
	var url = '/photo/' + params;

 	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = xmlhttp.responseText;
			script.src = response;
			document.getElementsByTagName('body')[0].appendChild(script);
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch the geolocation data');
	}
}

/**
 * Flickr API callback function
 * @param {String} response - Response from the Flickr API
 */
function jsonFlickrApi(response) {
    if (response.photos.photo.length > 0){
    	var photo;
    	if (response.photos.photo.length > 1) {
    		photo = response.photos.photo[1];
    		document.getElementById('header').style.backgroundImage = 
    			"linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('" + photo.url_l + "')";
    	} else {
    		photo = response.photos.photo[0];
    		document.getElementById('header').style.backgroundImage = 
    			"linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('" + photo.url_l + "')";
    	}
    } else {
        document.getElementById('header').style.backgroundImage = 
        	"linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/default-header-1.jpg')"
    }
}

/**
 * Call the getGeolocationAndWeather() function
 * when the page is fully loaded
 */
$(document).ready(function() {
	getGeolocationAndWeather();
});
