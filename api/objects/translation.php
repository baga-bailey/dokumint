<?php
class Translation{
	
	private $conn;
	private $table_name = "translation";
	
	public $translationID;
	public $language;
	public $paragraphID;
	public $text;
	public function __construct($db){
		$this->conn = $db;
	}
	
	function create(){
		
		$query  = "INSERT INTO " . $this->table_name . " (paragraphID, language, text) values (:paragraphID, :language, :text);";
		$stmt = $this->conn->prepare($query);
 
		// sanitize
		$this->paragraphID = htmlspecialchars(strip_tags($this->paragraphID));
		$this->language = htmlspecialchars(strip_tags($this->language));
		$this->text = htmlspecialchars(strip_tags($this->text));
		// bind values
		$stmt->bindParam(":paragraphID", $this->paragraphID);
		$stmt->bindParam(":language", $this->language);
		$stmt->bindParam(":text", $this->text);
		if($stmt->execute()){
			$results = $this->conn->lastInsertId();
			$translationID = $results;
			return $results;
		}
 
		return false;
		
	}
	
	function getTranslation(){
		$values = array("translationID" => $this->translationID, "language" => $this->language, "text" => $this->text);
		return $values;
	}
}
?>