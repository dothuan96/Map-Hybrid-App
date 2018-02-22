function onLoad() {
    document.addEventListener("deviceready", initMap, false);
    initMap();
}

//Direction service: https://developers.google.com/maps/documentation/javascript/examples/directions-simple
//Direction service documentaion: https://developers.google.com/maps/documentation/javascript/directions
//Travel mode: https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 41.85, lng: -87.65}
  });

  directionsDisplay.setMap(map);
  //get direction listener
  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(geocoder, directionsService, directionsDisplay);
  });
  //travel mode listener
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(geocoder, directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(geocoder, directionsService, directionsDisplay) {
  var startPoint = document.getElementById('start').value;
  var endPoint = document.getElementById('end').value;
  var selectedMode = document.getElementById('mode').value;
  var point1, point2;
  var add1, add2;
  //get Start point LatLong
  geocoder.geocode({'address': startPoint}, function(results, status) {    //define address
    if (status === 'OK') {
      //get addressn information, READE results object in documentaion
      point1 = results[0].geometry.location;     //get Long and Lat
      add1 = results[0].formatted_address;
    } else {
      console.log('Error start point!');
    }
  });
  //get End point LatLong
  geocoder.geocode({'address': endPoint}, function(results, status) {    //define address
    if (status === 'OK') {
      //get addressn information, READE results object in documentaion
      point2 = results[0]. geometry.location;     //get Long and Lat
      add2 = results[0].formatted_address;
      //get direction
      directionsService.route({
        origin: point1,
        destination: point2,
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
      //render information about direction
      var distance = google.maps.geometry.spherical.computeDistanceBetween (point1, point2)/1000;    //unit in m, then convert to km
      var info= "From: " + add1 + "<br>" +
                "To: " + add2 + "<br>" +
                "Total distance: " + distance.toFixed(2) + " km";     //round distance 2 decimal
      document.getElementById('add-info').innerHTML = info;
    } else {
      console.log('Error end point!');
    }
  });
}
