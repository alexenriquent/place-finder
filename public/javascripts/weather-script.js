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

function getGeolocationAndWeather() {
	getGeolocation();
}

function getGeolocation() {
	var url = 'http://www.telize.com/geoip';
	var position = {
		latitude: 0,
		longitude: 0
	};

	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = JSON.parse(xmlhttp.responseText);

			position.latitude = response.latitude;
			position.longitude = response.longitude;
			currentWeatherData.city.innerHTML = response.city;

			getWeather(position.latitude, position.longitude);
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch the geolocation data from Telize');
	}
}

function getWeather(latitude, longitude) {
	var key = '5e2107b0ce1ca798d76e32f41dcc81fe';
	var weatherDescription;
	var url = "http://api.openweathermap.org/data/2.5/weather?lat='" 
        + latitude + "'&lon='" + longitude + "'&APPID=" + key;

    if (window.XMLHttpRequest) {
    	xmlhttp = new XMLHttpRequest();
    	xmlhttp.addEventListener('load', function() {
    		var response = JSON.parse(xmlhttp.responseText);

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

function kelvinToCelsius(kelvin) {
	return (kelvin - 273.15).toFixed(2);
}

function getBackground(latitude, longitude, keyword) {
	var key = '34b0b3186145bc89472de08424c099f7';
	var script = document.createElement('script');

	script.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search" 
                + "&api_key=" + key + "&lat=" + latitude + "&lon=" + longitude 
                + "&accuracy=1&tags=" + keyword + "&sort=relevance&extras=url_l&format=json";

    document.getElementsByTagName('body')[0].appendChild(script);
}

function jsonFlickrApi(response) {
    if (response.photos.photo.length > 0){
    	var photo;
    	if (response.photos.photo.length > 1) {
    		photo = response.photos.photo[1];
    		document.getElementById('header').style.backgroundImage = "url('" + photo.url_l + "')";
    	} else {
    		photo = response.photos.photo[0];
    		document.getElementById('header').style.backgroundImage = "url('" + photo.url_l + "')";
    	}
    } else {
        document.getElementById('header').style.backgroundImage = "url('/images/default-header-1.jpg')"
    }
}

$(document).ready(function() {
	// getGeolocationAndWeather();
});
