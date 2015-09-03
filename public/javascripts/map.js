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

        infowindow = new google.maps.InfoWindow({
        	maxWidth: 200
       	});
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

	var lat = place.geometry.location.lat();
	var lng = place.geometry.location.lng();

	google.maps.event.addListener(marker, 'click', function() {
		getPlaceInfo(lat, lng, place.name);
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

function getPlaceInfo(latitude, longitude, name) {
	var id = 'IWLYPFQCMGW2FHGZFBB4T22JWJPXAYP3ILENFTP0NNDM4JCF';
	var secret = '5FCOEYO4TNKZYO2FUS5JF4KTHLRMUHIMQCZPBP3ICHKCA1OO';
	var url = 'https://api.foursquare.com/v2/venues/search?client_id=' 
			+ id + '&client_secret=' + secret + '&v=20150829&ll=' 
			+ latitude + ',' + longitude;

	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = JSON.parse(xmlhttp.responseText);
			var placeName = name.split(' ')[0].toLowerCase();
			var placeID;

			for (var i = 0; i < response.response.venues.length; i++) {
				if (response.response.venues[i].name.split(' ')[0].toLowerCase() == placeName) {
					placeID = response.response.venues[i].id;
					getPlaceDetails(placeID);
					break;
				} else {
					infowindow.setContent('<strong>' + name + '</strong>');
				}
			}
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch data from Foursquare');
	}
}

function getPlaceDetails(placeID) {
	var id = 'IWLYPFQCMGW2FHGZFBB4T22JWJPXAYP3ILENFTP0NNDM4JCF';
	var secret = '5FCOEYO4TNKZYO2FUS5JF4KTHLRMUHIMQCZPBP3ICHKCA1OO';
	var url = 'https://api.foursquare.com/v2/venues/' + placeID + '?client_id=' 
			+ id + '&client_secret=' + secret + '&v=20150829';

	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = JSON.parse(xmlhttp.responseText);
			var content = '';
			var photo;
			var photoLink = {
				size: '200x200',
				prefix: null,
				suffix: null
			};

			if (response.response.venue.photos.count > 0) {
				photoLink.prefix = response.response.venue.photos.groups[0].items[0].prefix;
				photoLink.suffix = response.response.venue.photos.groups[0].items[0].suffix;
				photo = photoLink.prefix + photoLink.size + photoLink.suffix;
			}

			var details = {
				name: response.response.venue.name,
				rating: response.response.venue.rating,
				address: response.response.venue.location.formattedAddress[0],
				phoneNumber: response.response.venue.contact.phone,
				website: response.response.venue.url,
				foursquare: response.response.venue.canonicalUrl,
				tips: [
					{
						tip: response.response.venue.tips.groups[0].items[0].text,
						firstName: response.response.venue.tips.groups[0].items[0].user.firstName,
						lastName: response.response.venue.tips.groups[0].items[0].user.lastName
					},
					{
						tip: response.response.venue.tips.groups[0].items[1].text,
						firstName: response.response.venue.tips.groups[0].items[1].user.firstName,
						lastName: response.response.venue.tips.groups[0].items[1].user.lastName
					}
				]
			};

			if (dataAvailable(photo)) {
				content += '<br/><img src="' + photo 
						+ '" class="img-responsive"' 
						+ ' style="margin-left:21px;">';
			}
			if (dataAvailable(details.name)) {
				content += '<br/><strong>'+ details.name + '</strong>';
			}
			if (dataAvailable(details.rating)) {
				content += '<br/>Rating: ' + details.rating + '/10';
			}
			if (dataAvailable(details.address)) {
				content += '<br/>Address: ' + details.address;
			}
			if (dataAvailable(details.phoneNumber)) {
				content += '<br/>Tel: ' + details.phoneNumber;
			}
			if (dataAvailable(details.website)) {
				content += '<br/>Website: <a href="' 
						+ details.website + '">' + details.name + '</a>';
			}
			if (dataAvailable(details.foursquare)) {
				content += '<br/>Foursquare: <a href="' 
						+ details.foursquare + '">View on Foursquare</a>';
			}
			if (dataAvailable(details.tips[0])) {
				content += '<br/><br/><strong>Tips and Reviews</strong>'
						+ '<br>"' + details.tips[0].tip + '"';
				if (dataAvailable(details.tips[0].firstName)) {
					content += ' — ' + details.tips[0].firstName;
					if (dataAvailable(details.tips[0].lastName)) {
						content += ' ' + details.tips[0].lastName;
					}
				} 
			}
			if (dataAvailable(details.tips[1])) {
				content += '<br><br/>"' + details.tips[1].tip + '"';
				if (dataAvailable(details.tips[1].firstName)) {
					content += ' — ' + details.tips[1].firstName;
					if (dataAvailable(details.tips[1].lastName)) {
						content += ' ' + details.tips[1].lastName;
					}
				} 
			}
			if (dataAvailable(details.foursquare)) {
				content += '<br/><br/>View more reviews on <a href="' 
						+ details.foursquare + '">Foursquare</a>';
			}

			infowindow.setContent(content);
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch data from Foursquare');
	}
}

function dataAvailable(data) {
	if (data != null) {
		return true;
	}
	return false;
}