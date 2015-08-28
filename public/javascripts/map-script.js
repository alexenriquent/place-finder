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

        placesSearch();

        infowindow = new google.maps.InfoWindow();
		var type = null;
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
	if (type != null) {
		service.nearbySearch({
			location: pos,
			radius: 1000,
			types: [type]
		}, callback);
	}
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		clearMarkers();
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

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
}

function buttonSearch(button, type) {
	button.onclick = function() {
		searchNearby(type);
	};
}

function placesSearch() {
	var input = document.getElementById('places-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		clearMarkers();

		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			createMarker(place);

			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
}

window.onload = function() {
	var types = ['restaurant', 'cafe', 'bar', 'night_club', 
				'meal_delivery', 'meal_takeaway', 'bakery', 'liquor_store'];
	var buttons = [];
	buttons = document.getElementsByClassName('btn');

	for (var i = 0; i < 10; i++) {
		buttonSearch(buttons[i], types[i]);
	}
}

