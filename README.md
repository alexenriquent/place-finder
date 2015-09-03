## Mashup/Docker Project ##

The API mashup provides users with visual and interactive way of exploring nearby places. The application detects locations of the web visitors and displays some basic information, including an interactive map and weather information in the area. User can discover the nearby businesses and services using some provided buttons labelled with place types/categories specified by the Google Places API. However, other place types/categories still can be searched via a search box.

### Services and Data APIs ###

**Telize API**

The Telize API allows users to request a website visitor's geolocation information. It uses an IP address to obtain location data using REST calls, then return the requested geolocation data in JSON format.

**Open Weather Map API**

The Open Weather Map API allows users to retrieve the current weather information with various options of parameters, such as city name or geographic coordinate. It uses REST calls and return data in JSON format.

**Flickr API**

The Flickr API allows users to retrieve photos from the Flickr photo sharing service. It supports REST and responds in many formats, including JSON.

**Google Maps API**

The Google Maps API is commonly used to embed Google Maps onto web applications using JavaScript interface.
 
**Google Places API**

The Google Places API is a web service that provides information about a particular place using specified parameters, such as latitude and longitude coordinates. This API will be used with the Google Maps API.

**Foursquare API**

The Foursquare API, currently in V2, grants access to the company's database of location as well as information on venue check in's. The APIs are Restful and support XML, JSON and JSONP.