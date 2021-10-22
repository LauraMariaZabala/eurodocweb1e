<?php
include "conexion.php";

$lr_directorio = $_POST['lr_directorio'];
$lr_archivo = $_POST['lr_archivo'];
$lr_ext = $_POST['lr_ext'];
$lr_radicado = $_POST['lr_radicado'];
grabar_anexo_FS($lr_directorio,$lr_archivo,$lr_ext,$lr_radicado);

function grabar_anexo_FS($lr_directorio,$lr_archivo,$lr_ext,$lr_radicado){
	chdir('..');
	$lr_directorio = 'others/anexos/'.$lr_directorio;

//	echo getcwd() . "\n"; //muestra la ruta actual
//	echo $lr_directorio;
//	var_dump(is_dir($lr_directorio));

	$lr_file = anexo_DB($lr_directorio,$lr_radicado,$lr_archivo,$lr_ext);
	$ruta = $lr_directorio.'/'.$lr_file;
	$settings = array();

	if(is_dir($lr_directorio)){; //valida si el directorio existe
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }else {
        move_uploaded_file($_FILES['file']['tmp_name'], $ruta);
		$total_anexos = leer_anexos($lr_radicado);
		$confirmacion = 'Archivo '.$lr_file.' anexado correctamente';
		array_push($settings,$confirmacion,$total_anexos);
//		echo 'Archivo '.$lr_archivo.' anexado correctamente';
    }
	}else{
		echo 'El directorio '.$lr_directorio.' no existe';
	}
echo json_encode($settings);
}

function anexo_DB($lr_directorio,$lr_radicado,$lr_archivo,$lr_ext){
$conexion = new Conectar();
$lrconn = $conexion->DB();

$settings2 = array();
$consecutivo = 0;
//$sql_leer = $lrconn->query("SELECT MAX(consecutivo) AS max_page FROM anexos WHERE cod_rad = '$lr_radicado' AND extension = '$lr_ext'");
$sql_leer = $lrconn->query("SELECT MAX(consecutivo) AS max_page FROM anexos WHERE cod_rad = '$lr_radicado'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
    array_push($settings2, $columna['max_page']);
	$consecutivo = $settings2[0] + 1;
	}
} 

$ruta = $lr_directorio.'/'.$lr_archivo.$consecutivo.'.'.$lr_ext;
$lr_file2 = $lr_archivo.$consecutivo.'.'.$lr_ext;
$sql_insertar = "INSERT INTO anexos (cod_rad,anexo,consecutivo,extension,carpeta,archivo) VALUES ('$lr_radicado','$ruta','$consecutivo','$lr_ext','$lr_directorio','$lr_file2')";
if (mysqli_query($lrconn, $sql_insertar)) {
	return $lr_archivo.$consecutivo.'.'.$lr_ext;
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
}

function leer_anexos($cod_rad){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT count(*) as total from anexos WHERE cod_rad = '$cod_rad'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  return $columna['total'];
 }
} else {
  echo "0 results";
}
//echo json_encode($settings);
}

?>