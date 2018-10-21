<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/document.php';

$database = new Database();
$db = $database->getConnection();

$document = new Document($db);

$stmt = $document->read();
$num = $stmt->rowCount();

if($num>0){

	$documents_arr=array();
	$documents_arr["records"]=array();
	
	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		extract($row);
		$document_item=array(
			"documentID" => $documentID,
			"documentName" => $documentName
		);
		array_push($documents_arr["records"],$document_item);
	}
	echo json_encode($documents_arr);
}else{
	echo json_encode(
		array("message" => "No documents found.")
	);
}
?>