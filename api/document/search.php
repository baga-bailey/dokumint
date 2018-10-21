<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/document.php';
 
// instantiate database and document object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$document = new Document($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query documents
$stmt = $document->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // documents array
    $documents_arr=array();
    $documents_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $document_item=array(
            "documentID" => $documentID,
            "documentName" => $documentName
        );
 
        array_push($documents_arr["records"], $document_item);
    }
 
    echo json_encode($documents_arr);
}
 
else{
    echo json_encode(
        array("message" => "No documents found.")
    );
}
?>