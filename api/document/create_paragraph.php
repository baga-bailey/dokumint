<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
 

include_once '../objects/document.php';
include_once '../objects/paragraph.php';

$database = new Database();
$db = $database->getConnection();

$document = new document($db);
$data = json_decode(file_get_contents("php://input"));
 
// set document property values
$document->documentID = $data->documentID;
$output = $document->createParagraph();


if(!is_null($output)){
	$paragraph_arr = array(
    "id" =>  $output
);
    echo(json_encode($paragraph_arr));
	#echo '{';
     #   echo '"message": "document was created."';
    #echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create paragraph."';
    echo '}';
}
?>