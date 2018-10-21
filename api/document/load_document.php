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
$data = json_decode(file_get_contents("php://input"));

$output = $document->getParagraphs($data->documentID);
$lastDocument = "";
$lastParagraph = "";
$lastTranslation = "";
$currentParagraph = null;
if(!is_null($output)){
		//print_r($output);
		$document->documentID = $output[0]["documentID"];
		$document->documentName = $output[0]["documentName"];
		//print_r($output[0]["documentName"]);
		$lastParagraph = $output[0]["paragraphID"];
		$currentParagraph = new Paragraph($db);
		$currentParagraph->paragraphID = $output[0]["paragraphID"];
		for($x = 0; $x < count($output); $x++){
			
			if($output[$x]["paragraphID"] != $lastParagraph){
					
					$document->paragraphs[] = $currentParagraph;
					$currentParagraph = new Paragraph($db);
					
			}
			$translation = new Translation($db);
			$translation->translationID = $output[$x]["translationID"];
			$translation->language = $output[$x]["language"];
			$translation->text = $output[$x]["text"];
			$currentParagraph->translation[] = $translation;
			$lastParagraph = $output[$x]["paragraphID"];
		}
		$document->paragraphs[] = $currentParagraph;
		$json = json_encode($document->getDocument());
		echo $json;
}
else{
	 echo '{';
        echo '"message": "Unable to load Document."';
    echo '}';
}
?>