<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/translation.php';
include_once '../objects/document.php';
include_once '../objects/paragraph.php';

$database = new Database();
$db = $database->getConnection();
$document = new document($db);
$document->documentID = 1;
$document->documentName = "test";
$document->paragraphs = array("test","test2","test3");

echo document->getDocument();