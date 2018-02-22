<?php
header('Access-Control-Allow-Origin: *');
require 'phase4_info.php';

// Gets data from URL parameters
$name = $_GET['name'];
$address = $_GET['address'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$content = $_GET['content'];

// Opens a connection to a MySQL server
$connection = mysqli_connect ("mysli.oamk.fi", $username, $password, $database);
if (!$connection) {
  die('Not connected : ' . mysqli_connect_error());
}

// Set the active MySQL database
$db_selected = mysqli_select_db($connection, $database);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysqli_error($connection));
}
else {
  echo "Server connected!";
}

// Insert new row with user data
$query = sprintf("INSERT INTO marker_add_info " .
         " (id, name, address, lat, lng, content ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s', '%s');",
         mysqli_real_escape_string($connection, $name),
         mysqli_real_escape_string($connection, $address),
         mysqli_real_escape_string($connection, $lat),
         mysqli_real_escape_string($connection, $lng),
         mysqli_real_escape_string($connection, $content));

$result = mysqli_query($connection, $query);

if (!$result) {
  die('Invalid query: ' . mysqli_error($connection));
}
else {
  echo "New data inserted!";
}

?>
