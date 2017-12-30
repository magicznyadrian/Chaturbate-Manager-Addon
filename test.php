<?php
require('simple_html_dom.php');
$a=$_GET["name"];
$htmla = file_get_html('https://chaturbate.com/'.$a);

$headlines = array();
foreach($htmla->find('div[id=defchat]') as $header){
$test=$header->plaintext;
$status = strrpos($test, "currently offline");
$age = strrpos($test, "Age");

if ($status === false) { 
	echo("<b>Name: </b>".substr($a, -12). "<br><b>  Status:</b> ". "ON"."<br><b>Age: </b>".substr($test, $age+4,3));
}else{
	echo("<b>Name: </b>".substr($a, -12). "<br><b>  Status:</b> ". "OFFLINE");
}
}
?>

