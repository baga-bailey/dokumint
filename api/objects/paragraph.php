<?php
class Paragraph{
	
	private $conn;
	private $table_name = "paragraph";
	
	public $paragraphID;
	public $translation = array();
	public function __construct($db){
		$this->conn = $db;
	}
	function create($documentID){
		
		$query  = "INSERT INTO " . $this->table_name . " (documentID) values (:documentID);";
		
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$documentID = htmlspecialchars(strip_tags($documentID));
		
 
		// bind values
		$stmt->bindParam(":documentID", $documentID);
		
		// execute query
		
		if($stmt->execute()){
			$results = $this->conn->lastInsertId();
			$paragraphID = $results;
			return $results;
		}
 
		return false;
     
	}
	function getParagraph(){
		$translations = array();
		$i = 0;
		while($i < sizeof($this->translation)){
			
				$translations[] = $this->translation[$i]->getTranslation();
				$i++;
		}
		$values = array("paragraphID" => $this->paragraphID, "translations" => $translations);
		return $values;
	}
	function getTranslations(){
		
		$query = "SELECT paragraph.paragraphID, translation.translationID from paragraph JOIN translation ON paragraph.paragraphID = translation.paragraphID where paragraph.paragraphID = 1;";
		$stmt = $this->conn->prepare($query);
		$result = $stmt.execute();
		if($result){
			while($row = mysql_fetch_array($result))
			{
				$translation = new paragraph($db);
				$translation->getTranslation();

			}	
		}
	}
	
}

?>