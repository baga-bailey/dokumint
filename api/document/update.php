<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/document.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$document = new Document($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$document->documentID = $data->documentID;
 
// set product property values
$document->documentID = $data->documentID;
$document->documentName = $data->documentName;

 
// update the product
if($document->update()){
    echo '{';
        echo '"message": "document was updated."';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update document."';
    echo '}';
}
?>