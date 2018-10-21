<?php
include_once '../objects/paragraph.php';
class Document{
	
	private $conn;
	private $table_name = "document";
	
	public $documentID;
	public $documentName;
	public $paragraphs = array();
	
	public function __construct($db){
		$this->conn = $db;
	}
	
	function read(){
		
		$query = "SELECT documentID, documentName FROM " . $this->table_name . ";";
		
		$stmt = $this->conn->prepare($query);
		$stmt->execute();
		return $stmt;
	}
	
	// create document
	function create(){
 
		// query to insert record
		$query = "INSERT INTO " . $this->table_name . " SET documentName=:documentName;";
		
		// prepare query
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->documentName=htmlspecialchars(strip_tags($this->documentName));
		
 
		// bind values
		$stmt->bindParam(":documentName", $this->documentName);
		
		// execute query
		
		if($stmt->execute()){
			$results = $this->conn->lastInsertId();;
			return $results;
		}
 
		return false;
     
	}
	
		// used when filling up the update document form
function readOne(){
 
    // query to read single record
    $query = "SELECT documentID, documentName FROM " . $this->table_name . " WHERE documentID = ? LIMIT 0,1";
    // prepare query statement
    $stmt = $this->conn->prepare( $query );
 
    // bind id of document to be updated
    $stmt->bindParam(1, $this->documentID);
 
    // execute query
    $stmt->execute();
 
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
    // set values to object properties
    $this->documentID = $row['documentID'];
    $this->documentName = $row['documentName'];
    
}
// update the document
function update(){
 
    // update query
    $query = "UPDATE
                " . $this->table_name . "
            SET
                documentName = :documentName,
               
                
            WHERE
                documentID = :documentID";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->documentName=htmlspecialchars(strip_tags($this->documentName));
    
    
 
    // bind new values
    $stmt->bindParam(':documentName', $this->documentName);
    $stmt->bindParam(':documentID', $this->documentID);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }
 
    return false;
}
// delete the document
function delete(){
 
    // delete query
    $query = "DELETE FROM " . $this->table_name . " WHERE documentID = ?";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->documentID=htmlspecialchars(strip_tags($this->documentID));
 
    // bind id of record to delete
    $stmt->bindParam(1, $this->documentID);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}
// search documents
function search($keywords){
 
    // select all query
    $query = "SELECT
				documentID, documentName
            FROM
                " . $this->table_name . "
                
            WHERE
                documentName LIKE ?";
            
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $keywords=htmlspecialchars(strip_tags($keywords));
    $keywords = "%{$keywords}%";
 
    // bind
    $stmt->bindParam(1, $keywords);
    
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

function createParagraph(){
	
	$paragraph = new Paragraph($this->conn);
	$result = $paragraph->create($this->documentID);
	if($result){
		$this->paragraphs[] = $result;
		return $result;
	}
	else{
		return false;
	}
	
	
}
function getDocument(){
	$paragraphs = array();
	$i = 0;
	while ($i < sizeof($this->paragraphs)){
		$paragraphs[] = $this->paragraphs[$i]->getParagraph();
		$i++;
	}
	$values = array("documentID" => $this->documentID, "documentName" => $this->documentName, "paragraphs" => $paragraphs);
	return $values;
}
function getparagraphs($documentID){
	#maybe use join to join document table with paragraphs etc. Then loop through creating each.
	$query = "select document.documentID, document.documentName, paragraph.paragraphID,translation.translationID, translation.language, translation.text 
	from document 
	left join paragraph on paragraph.documentID = document.documentID 
	right join translation on paragraph.paragraphID = translation.paragraphID 
	where document.documentID = " . $documentID . " order by document.documentID, paragraph.paragraphID,translation.translationID;";
	//echo $query;
	$stmt = $this->conn->prepare($query);
	
	if($stmt->execute()){
		
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	else{
		return false;
	}
}
}
?>
