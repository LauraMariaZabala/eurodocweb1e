<?php
include "conexion.php";

class Leer {

function tabla_radicados(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM radicados");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_rad'],$columna['cod_soc'],$columna['cod_correspondencia'],$columna['creado_por'],$columna['fecha_creado'],
	$columna['hora_creado'],$columna['modificado_por'],$columna['fecha_modificado'],$columna['hora_modificado'],$columna['tipo_documental'],$columna['asunto']
	));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function tabla_sociedades(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM sociedades");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_soc'],$columna['descripcion'],$columna['nit'],$columna['moneda'],$columna['responsable'],$columna['activo']));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }


function actualizar_sociedades($id_sociedad,$texto_sociedad,$nit,$moneda,$responsable,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_actualizar = "UPDATE sociedades SET cod_soc='$id_sociedad',descripcion='$texto_sociedad',nit='$nit',moneda='$moneda',responsable='$responsable',activo='$activo' WHERE cod_soc='$id_sociedad'";
if (mysqli_query($lrconn, $sql_actualizar)) {
	echo "Sociedad actualizada";
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }


function insertar_sociedades($id_sociedad,$texto_sociedad,$nit,$moneda,$responsable,$activo,$direccion,$pais, $region,$telefono,$email){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_insertar = "INSERT INTO sociedades (cod_soc,descripcion,nit,moneda,responsable,activo, direccion, pais, region,telefono, email) VALUES ('$id_sociedad','$texto_sociedad','$nit','$moneda','$responsable','$activo','$direccion','$pais','$region','$telefono','$email')";
if (mysqli_query($lrconn, $sql_insertar)) {
	echo "Sociedad creada correctamente";
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function borrar_sociedades($id_sociedad){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_borrar = "DELETE FROM sociedades WHERE cod_soc='$id_sociedad'";
if (mysqli_query($lrconn, $sql_borrar)) {
	echo "Sociedad borrada";
} else {
	echo "Error: " . $sql_borrar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function sociedades_correspondencia(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM sociedades");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['descripcion'],$columna['activo'],$columna['cod_soc']));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function insertar_correspondencia($id_correspondencia,$tipo_correspondencia,$sociedad,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_insertar = "INSERT INTO tipo_correspondencia (cod_correspondencia,descripcion,sociedad,activo) VALUES ('$id_correspondencia','$tipo_correspondencia','$sociedad','$activo')";
if (mysqli_query($lrconn, $sql_insertar)) {
	echo "Tipo de correspondencia creada correctamente";
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function correspondencia_leer(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM tipo_correspondencia");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_correspondencia'],$columna['descripcion'],$columna['sociedad'],$columna['activo']));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function borrar_correspondencia($id_correspondencia){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_borrar = "DELETE FROM tipo_correspondencia WHERE cod_correspondencia='$id_correspondencia'";
if (mysqli_query($lrconn, $sql_borrar)) {
	echo "Tipo de correspondencia borrada correctamente";
} else {
	echo "Error: " . $sql_borrar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function actualizar_correspondencia($id_correspondencia,$tipo_correspondencia,$sociedad,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_actualizar = "UPDATE tipo_correspondencia SET cod_correspondencia='$id_correspondencia',descripcion='$tipo_correspondencia',sociedad='$sociedad',activo='$activo' WHERE cod_correspondencia='$id_correspondencia'";
if (mysqli_query($lrconn, $sql_actualizar)) {
	echo "Tipo de correspondencia actualizada correctamente";
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function documentales_leer(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM tipo_documental");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_soc'],$columna['cod_corresp'],$columna['cod_documental'],$columna['descripcion'],$columna['activo']));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function insertar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_insertar = "INSERT INTO tipo_documental (cod_soc,cod_corresp,cod_documental,descripcion,activo) VALUES ('$sociedad','$id_correspondencia','$id_documental','$tipo_documental','$activo')";
if (mysqli_query($lrconn, $sql_insertar)) {
	echo "Tipo de documental creado correctamente";
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function borrar_documental($id_documental){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_borrar = "DELETE FROM tipo_documental WHERE cod_documental='$id_documental'";
if (mysqli_query($lrconn, $sql_borrar)) {
	echo "Tipo documental borrado correctamente";
} else {
	echo "Error: " . $sql_borrar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function actualizar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_actualizar = "UPDATE tipo_documental SET cod_soc='$sociedad',cod_corresp='$id_correspondencia',cod_documental='$id_documental',descripcion='$tipo_documental',activo='$activo' WHERE cod_documental='$id_documental'";
if (mysqli_query($lrconn, $sql_actualizar)) {
	echo "Tipo documental actualizado correctamente";
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function asuntos_leer(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM asuntos");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_soc'],$columna['cod_corresp'],$columna['cod_documental'],$columna['id_asunto'],$columna['texto_asunto'],$columna['activo']));	
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function insertar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_insertar = "INSERT INTO asuntos (cod_soc,cod_corresp,cod_documental,id_asunto,texto_asunto,activo) VALUES ('$sociedad','$id_correspondencia','$documental','$id_asunto','$texto_asunto','$activo')";
if (mysqli_query($lrconn, $sql_insertar)) {
	echo "Asunto creado correctamente";
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function actualizar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_actualizar = "UPDATE asuntos SET cod_soc='$sociedad',cod_corresp='$id_correspondencia',cod_documental='$documental',id_asunto='$id_asunto',texto_asunto='$texto_asunto',activo='$activo' WHERE id_asunto='$id_asunto'";
if (mysqli_query($lrconn, $sql_actualizar)) {
	echo "Tipo documental actualizado correctamente";
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }
	   	   
function insertar_radicado($cod_rad,$cod_soc,$texto_sociedad,$cod_correspondencia,$texto_correspondencia,$estado,$creado_por,$fecha_creado,$hora_creado,$modificado_por,$fecha_modificado,$hora_modificado,$tipo_documental,$asunto,$comunicacion,$fecha_documento,$identificacion,$empleado,$descripcion){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$year = date("Y");
$consecutivo = $this->consecutivo_radicado($year,$cod_soc,$cod_correspondencia);
$cod_rad = $year.$cod_soc.$cod_correspondencia.$consecutivo;
$sql_insertar = "INSERT INTO radicados (cod_rad,year,cod_soc,cod_correspondencia,consecutivo,estado,creado_por,fecha_creado,hora_creado,modificado_por,fecha_modificado,hora_modificado,tipo_documental,asunto,comunicacion,fecha_documento,identificacion,empleado,descripcion) 
VALUES ('$cod_rad','$year','$texto_sociedad','$texto_correspondencia','$consecutivo','$estado','$creado_por','$fecha_creado','$hora_creado','$modificado_por','$fecha_modificado','$hora_modificado','$tipo_documental','$asunto','$comunicacion','$fecha_documento','$identificacion','$empleado','$descripcion')";
if (mysqli_query($lrconn, $sql_insertar)) {
	array_push($settings,"1",$cod_rad);
} else {
	array_push($settings,"2","Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>");
}
echo json_encode($settings);
//$conexion->cerrar();
	   }

function leer_radicado($radicado){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM radicados WHERE cod_rad = '$radicado'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['cod_rad'],$columna['cod_soc'],$columna['cod_correspondencia'],$columna['estado'],$columna['creado_por'],
  $columna['fecha_creado'],$columna['hora_creado'],$columna['modificado_por'],$columna['fecha_modificado'],$columna['hora_modificado'],
  $columna['tipo_documental'],$columna['asunto'],$columna['comunicacion'],$columna['fecha_documento'],$columna['identificacion'],
  $columna['empleado'],$columna['descripcion']
	));
	}
} else {
  echo "0 results";
}
return $settings;
//$conexion->cerrar();
	   }

function grabar_pantallas(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$mostrar_sociedad = $_POST["mostrar_sociedad"];
$mostrar_correspondencia = $_POST["mostrar_correspondencia"];
$mostrar_radicado = $_POST["mostrar_radicado"];
$mostrar_estado = $_POST["mostrar_estado"];
$mostrar_creado = $_POST["mostrar_creado"];
$mostrar_modificado = $_POST["mostrar_modificado"];
$mostrar_documental = $_POST["mostrar_documental"];
$mostrar_asunto = $_POST["mostrar_asunto"];
$mostrar_comunicacion = $_POST["mostrar_comunicacion"];
$mostrar_fecha = $_POST["mostrar_fecha"];
$mostrar_identificacion = $_POST["mostrar_identificacion"];
$mostrar_empleado = $_POST["mostrar_empleado"];
$mostrar_descripcion = $_POST["mostrar_descripcion"];
$mostrar_anexo = $_POST["mostrar_anexo"];
		
$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_correspondencia' WHERE campo='Correspondencia'";
if (mysqli_query($lrconn, $sql_actualizar)) {
	echo "Pantalla actualizada correctamente";
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_sociedad' WHERE campo='Sociedad'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_radicado' WHERE campo='radicado'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_estado' WHERE campo='estado'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_creado' WHERE campo='creado'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_modificado' WHERE campo='modificado'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_documental' WHERE campo='documental'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_asunto' WHERE campo='asunto'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_comunicacion' WHERE campo='comunicacion'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_fecha' WHERE campo='fecha'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_identificacion' WHERE campo='identificacion'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_empleado' WHERE campo='empleado'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_descripcion' WHERE campo='descripcion'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}

$sql_actualizar = "UPDATE pantalla SET mostrar='$mostrar_anexo' WHERE campo='anexo'";
if (mysqli_query($lrconn, $sql_actualizar)) {
} else {
	echo "Error: " . $sql_actualizar . " - " . mysqli_error($lrconn) . "<br>";
}
}

function leer_pantallas(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM pantalla");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['campo'],$columna['mostrar']));		
 }
} else {
  echo "0 results";
}
echo json_encode($settings);
}

function insertar_ruta($year,$sociedad,$id_correspondencia,$id_ruta,$directorio_archivos,$activo){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$sql_insertar = "INSERT INTO rutas (year,cod_soc,cod_corresp,nombre_ruta,carpeta_archivos,activo) VALUES ('$year','$sociedad','$id_correspondencia','$id_ruta','$directorio_archivos','$activo')";
if (mysqli_query($lrconn, $sql_insertar)) {
	echo "Ruta/carpeta creada correctamente";
} else {
	echo "Error: " . $sql_insertar . " - " . mysqli_error($lrconn) . "<br>";
}
//$conexion->cerrar();
	   }

function leer_rutas(){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM rutas");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['year'],$columna['cod_soc'],$columna['cod_corresp'],$columna['nombre_ruta'],$columna['carpeta_archivos'],$columna['activo']));
 }
} else {
  echo "0 results";
}
echo json_encode($settings);
}

function leer_directorios($year,$sociedad,$id_correspondencia){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM rutas WHERE year = '$year' AND cod_soc = '$sociedad' AND cod_corresp = '$id_correspondencia'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,array($columna['nombre_ruta'],$columna['activo']));
 }
} else {
  echo "0 results";
}
echo json_encode($settings);
}

function consecutivo_radicado($year,$cod_soc,$cod_correspondencia){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings2 = array();
$consecutivo = 0;
$sql_leer = $lrconn->query("SELECT MAX(consecutivo) AS max_page FROM radicados WHERE year = '$year' AND cod_soc = '$cod_soc' AND cod_correspondencia = '$cod_correspondencia'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
    array_push($settings2, $columna['max_page']);
	$consecutivo = $settings2[0] + 1;
	}
} 
// return $year.$cod_soc.$cod_correspondencia.$consecutivo;
return $consecutivo;
}

function leer_max_anexos($cod_rad){
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

function leer_anexos($cod_rad){
$conexion = new Conectar();
$lrconn = $conexion->DB();
$settings = array();
$sql_leer = $lrconn->query("SELECT * FROM anexos WHERE cod_rad = '$cod_rad'");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
  array_push($settings,$columna['anexo']);
 }
} else {
  echo "0 results";
}
echo json_encode($settings);
}

} ?>
