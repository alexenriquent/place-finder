function getPlaceInfo() {
	// var key = 'AIzaSyBE0F5GdLcE3651WbPXlUhuKINvpwij5ZQ';
	// var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' 
	// 		+ latitude + ',' + longitude + '&radius=100&&key=' + key;
	//var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-27.471011,153.023449&radius=500&key=AIzaSyBE0F5GdLcE3651WbPXlUhuKINvpwij5ZQ';
	//var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyBE0F5GdLcE3651WbPXlUhuKINvpwij5ZQ';
	var url = 'https://api.foursquare.com/v2/venues/search?client_id=IWLYPFQCMGW2FHGZFBB4T22JWJPXAYP3ILENFTP0NNDM4JCF&client_secret=5FCOEYO4TNKZYO2FUS5JF4KTHLRMUHIMQCZPBP3ICHKCA1OO&v=20150829&ll=-27.471421,153.02724999999998';

	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.addEventListener('load', function() {
			var response = JSON.parse(xmlhttp.responseText);
			alert(xmlhttp.responseText);
		}, false);

		xmlhttp.addEventListener('error', function(err) {
			alert('Unable to complete the request');
		}, false);

		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	} else {
		alert('Unable to fetch data');
	}
	
}

// getPlaceInfo();
