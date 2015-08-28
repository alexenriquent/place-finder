var map;
var markers = [];
var infowindow;
var pos = {lat: 0, long: 0};

function initMap() {
	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos.lat = position.coords.latitude,
        pos.lng = position.coords.longitude
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: pos,
            zoom: 16
        });
        infowindow = new google.maps.InfoWindow();
		var type = '';
		searchNearby(type);
    }, function() {
        handleLocationError(true, infowindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infowindow, map.getCenter());
  }
}

function searchNearby(type) {
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: pos,
		radius: 1000,
		types: [type]
	}, callback);
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});

	markers.push(marker);
}

window.onload = function() {
	var buttons = [];
	buttons = document.getElementsByClassName('btn');

	for (var i = 0; i < 10; i++) {
		buttonSearch(buttons[i]);
	}
}

function buttonSearch(button) {
	button.onclick = function() {
		searchNearby(button.innerHTML.toLowerCase());
	};
}

