<?php
class Conectar {
public $servername = "localhost";
public $dbname = "marthadd_eurodocweb";
public $usr = "marthadd_eurodocweb";
public $pwd = "Myp4r7n3r+1";
public $ir_conn;

   function DB(){  
	$conn = new mysqli($this->servername, $this->usr, $this->pwd, $this->dbname);
	$this->ir_conn = $conn;
	if ($conn->connect_error) {
		return "<BR>Error conectando a DB: " . $conn->connect_error;
	}else{
		return $conn;
	}
   }
   
   function cerrar(){  
		$this->ir_conn->close();
   }
}
?>
