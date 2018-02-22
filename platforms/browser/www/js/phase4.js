function onLoad() {
    document.addEventListener("deviceready", initMap, false);
    initMap();
}

var map;
var marker;
var infowindow;

function initMap() {
  var options = {
    zoom: 13,
    center: new google.maps.LatLng(37.4419, -122.1419),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), options);
  var html = "<table>" +
             "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
             "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
             "<tr><td>Content:</td> <td><input type='text' id='content'/></td></tr>" +
             "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";
infowindow = new google.maps.InfoWindow({
 content: html
});

google.maps.event.addListener(map, "click", function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });
    google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
    });
});
return map;
}

function saveData() {
  var name = escape(document.getElementById("name").value);
  var address = escape(document.getElementById("address").value);
  var content = document.getElementById("content").value;
  var latlng = marker.getPosition();

  var url = "http://www.students.oamk.fi/~t6dova00/phase4_addrow.php?name=" + name + "&address=" + address +
            "&content=" + content + "&lat=" + latlng.lat() + "&lng=" + latlng.lng();

  downloadUrl(url, function(data, responseCode) {
    if (responseCode == 200 && data.length <= 100) {
      infowindow.close();
      //document.getElementById("message").innerHTML = "Location added.";
      infowindow = new google.maps.InfoWindow({
       content: "Location added."
      });
      infowindow.open(map, marker);
    }
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
      console.log(request.responseText);
      console.log(request.status);      //search google XMLHttpRequest object
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}
