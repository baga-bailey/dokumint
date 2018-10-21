<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/translation.php';


$database = new Database();
$db = $database->getConnection();

$translation = new translation($db);
$data = json_decode(file_get_contents("php://input"));
$translation->paragraphID = $data->paragraphID;
$translation->language = $data->language;
$translation->text = $data->text;
echo $translation->text;
$output = $translation->create();
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
        echo '"message": "Unable to create translation."';
    echo '}';
}
?>