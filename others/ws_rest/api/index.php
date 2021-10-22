<?php
include "../../../controller/SQL.php";

$input = $_GET;
//var_dump($input);
	
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
  
if($input['radicado'] == '*'){ //muestra todos los resultados
$lectura = new Leer();
$resultado = $lectura->tabla_radicados();
var_dump($resultado);
}else{ //muestra un resultado individual
$lectura = new Leer();
$radicado = $input['radicado'];
$resultado = $lectura->leer_radicado($radicado);
var_dump($resultado);
}
  break;

  case 'POST':
$inputJSON = file_get_contents('php://input');
$input2 = json_decode( $inputJSON,true );
$fecha = new DateTime('NOW');
$lr_tmsp = $fecha->getTimestamp();
$cod_rad = $lr_tmsp;
$cod_soc = $input2['sociedad'];
$cod_correspondencia = $input2['correspondencia'];
$estado = $input2['estado'];
$creado_por = $input2['creado_por'];
$fecha_creado = $input2['fecha_creado'];
$hora_creado = $input2['hora_creado'];
$modificado_por = $input2['modificado_por'];
$fecha_modificado = $input2['fecha_modificado'];
$hora_modificado = $input2['hora_modificado'];
$tipo_documental = $input2['tipo_documental'];
$asunto = $input2['asunto'];
$comunicacion = $input2['comunicacion'];
$fecha_documento = $input2['fecha_documento'];
$identificacion = $input2['identificacion'];
$empleado = $input2['empleado'];
$descripcion = $input2['descripcion'];

$lectura = new Leer();
	$resultado = $lectura->insertar_radicado($cod_rad,$cod_soc,$cod_correspondencia,$estado,$creado_por,$fecha_creado,$hora_creado,$modificado_por,$fecha_modificado,$hora_modificado,$tipo_documental,$asunto,$comunicacion,$fecha_documento,$identificacion,$empleado,$descripcion);
	echo $resultado;
  break;

}
	
//debugs
//$radicado = $_POST['radicado'];
//echo json_encode($resultado);
//	echo $_SERVER['REQUEST_METHOD'];
//		echo $input['radicado'];
//	var_dump($input);
//	echo $_SERVER['REQUEST_METHOD'];
//		echo array_search("21323",$input);
//	var_dump($input2);
//		echo $input2['sociedad'];
//		$settings = array();
//  array_push($settings,array($input2));
//	var_dump($settings);
	
 ?>