function onLoad() {
    document.addEventListener("deviceready", initMap, false);
    initMap();
}

//https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
//Documentation Geocoding service: https://developers.google.com/maps/documentation/javascript/geocoding

//initialize a map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}    //Lat andLong default
  });
  var geocoder = new google.maps.Geocoder();    //access Geocoder object

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder);
  });
  document.getElementById('mark-location').addEventListener('click', getMapLocation);
  var Latitude = undefined;
  var Longitude = undefined;

  return map;
}

function geocodeAddress(geocoder) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {    //define address
    if (status === 'OK') {
      //get addressn information, READE results object in documentaion
      var latLong = results[0].geometry.location;     //get Long and Lat
      var addressFormat = results[0].formatted_address;   //get format address
      var bound = results[0].geometry.bounds;   //get bound
      var viewPort = results[0].geometry.viewport;    //get viewport
      var placeID = results[0].place_id;    //get place ID

      getMap(latLong);

      //display address information
      var info = document.getElementById('add-info');
      info.innerHTML =  "Location: " + latLong + "<br>" +
                        "Address: " + addressFormat + "<br>" +
                        /*"Bound: " + bound + "<br>" +
                        "Viewport: " + viewPort + "<br>" +*/
                        "Place ID: " + placeID;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Get geo coordinates
function getMapLocation() {
    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates
var onMapSuccess = function (position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    var latLong = new google.maps.LatLng(Latitude, Longitude);
    getMap(latLong);
}

//get map based on Lat and Long as parameter
function getMap(latLong) {
  var resultsMap = initMap();

  resultsMap.setCenter(latLong);
  //mark the address based on Lat and Long
  var marker = new google.maps.Marker({
    map: resultsMap,
    position: latLong
  });
  resultsMap.setZoom(15);
  //display address information
  var info = document.getElementById('add-info');
  info.innerHTML =  "Location: " + latLong + "<br>";
}

// Error callback
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
