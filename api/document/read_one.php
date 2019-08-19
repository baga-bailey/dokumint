<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/document.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$document = new Document($db);

// set ID property of product to be edited
$document->documentID = isset($_GET['documentID']) ? $_GET['documentID'] : die();

// read the details of product to be edited
$document->readOne();

// create array
$document_arr = array(
    "id" =>  $document->documentID,
    "name" => $document->documentName
);

// make it json format
print_r(json_encode($document_arr));
?>