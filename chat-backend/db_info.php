<?php
use \stdClass;

$dbInfo = new stdClass();

$dbInfo->host = "localhost";
$dbInfo->username="dev4brot_jean";
$dbInfo->password="juvenajean";
$dbInfo->database="dev4brot_jean";

// Opens a connection to a MySQL server
$dbConnection=mysql_connect($dbInfo->host, $dbInfo->username, $dbInfo->password);
mysql_set_charset('utf8',$dbConnection);
if (!$dbConnection) {
  die('Not connected : ' . mysql_error());
}

//Selects database
$db = mysql_select_db($dbInfo->database, $dbConnection);

function dbQuery ($query, $single) {
	$result = mysql_query($query);
	$resultArray = array();
	//print_r($result);
	if (!$result) {
	  die('Invalid query: ' . mysql_error());
	}
	while($row = @mysql_fetch_object($result)){
		array_push($resultArray, $row);
	}
	if($single){
		return $resultArray[0];
	}
	else{
		return $resultArray;
	}

};

?>