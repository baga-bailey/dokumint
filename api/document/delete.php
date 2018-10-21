<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/document.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare document object
$document = new Document($db);
 
// get document id
$data = json_decode(file_get_contents("php://input"));
 
// set document id to be deleted
$document->id = $data->id;
 
// delete the document
if($document->delete()){
    echo '{';
        echo '"message": "Document was deleted."';
    echo '}';
}
 
// if unable to delete the document
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>