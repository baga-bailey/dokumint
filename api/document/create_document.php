<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/document.php';
 
$database = new Database();
$db = $database->getConnection();
 
$document = new document($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$document->documentName = $data->documentName;


 
// create the document
$output = $document->create();
echo $output;

if(!is_null($output)){
	$document_arr = array(
    "id" =>  $output
);
    echo(json_encode($document_arr));
	#echo '{';
     #   echo '"message": "document was created."';
    #echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create document."';
    echo '}';
}
?>