<?php
include "SQL.php";

$consulta = $_POST['consulta'];
$operacion = $_POST['operacion'];

//----------------BOF  RADICACION---------------------//

if( $consulta == "documental" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->documentales_leer();
echo json_encode($resultado);
}

if( $consulta == "asuntos" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->asuntos_leer();
echo json_encode($resultado);
}

if( $consulta == "documental" && $operacion == "insertar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$id_documental = $_POST['id_documental'];
$tipo_documental = $_POST['tipo_documental'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo);
echo $resultado;
}

if( $consulta == "documental" && $operacion == "borrar"){
$lectura = new Leer();
$id_documental = $_POST['id_documental'];
$resultado = $lectura->borrar_documental($id_documental);
echo $resultado;
}

if( $consulta == "documental" && $operacion == "actualizar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$id_documental = $_POST['id_documental'];
$tipo_documental = $_POST['tipo_documental'];
$activo = $_POST['activo'];
$resultado = $lectura->actualizar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo);
echo $resultado;
}

if( $consulta == "radicado" && $operacion == "crear"){
$lectura = new Leer();
$cod_rad = $_POST['cod_rad'];
$cod_soc = $_POST['cod_soc'];
$texto_sociedad = $_POST['texto_sociedad'];
$cod_correspondencia = $_POST['cod_correspondencia'];
$texto_correspondencia = $_POST['texto_correspondencia'];
$estado = $_POST['estado'];
$creado_por = $_POST['creado_por'];
$fecha_creado = $_POST['fecha_creado'];
$hora_creado = $_POST['hora_creado'];
$modificado_por = $_POST['modificado_por'];
$fecha_modificado = $_POST['fecha_modificado'];
$hora_modificado = $_POST['hora_modificado'];
$tipo_documental = $_POST['tipo_documental'];
$asunto = $_POST['asunto'];
$comunicacion = $_POST['comunicacion'];
$fecha_documento = $_POST['fecha_documento'];
$identificacion = $_POST['identificacion'];
$empleado = $_POST['empleado'];
$descripcion = $_POST['descripcion'];
$resultado = $lectura->insertar_radicado($cod_rad,$cod_soc,$texto_sociedad,$cod_correspondencia,$texto_correspondencia,$estado,$creado_por,$fecha_creado,$hora_creado,$modificado_por,$fecha_modificado,$hora_modificado,$tipo_documental,$asunto,$comunicacion,$fecha_documento,$identificacion,$empleado,$descripcion);
echo $resultado;
//echo json_encode($resultado);
}
//----------------EOF  RADICACION---------------------//

//----------------BOF  HISTORIA LABORAL---------------------//
if( $consulta == "sociedades" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->sociedades_correspondencia();
echo json_encode($resultado);
}

if( $consulta == "sociedades2" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->tabla_sociedades();
echo json_encode($resultado);
}

if( $consulta == "correspondencia" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->correspondencia_leer();
echo json_encode($resultado);
}

if( $consulta == "asunto" && $operacion == "insertar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$documental = $_POST['documental'];
$id_asunto = $_POST['id_asunto'];
$texto_asunto = $_POST['texto_asunto'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo);
echo $resultado;
}


if( $consulta == "documental" && $operacion == "borrar"){
$lectura = new Leer();
$id_documental = $_POST['id_documental'];
$resultado = $lectura->borrar_documental($id_documental);
echo $resultado;
}

if( $consulta == "asunto" && $operacion == "actualizar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$documental = $_POST['documental'];
$id_asunto = $_POST['id_asunto'];
$texto_asunto = $_POST['texto_asunto'];
$activo = $_POST['activo'];
$resultado = $lectura->actualizar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo);
echo $resultado;
}
//----------------EOF  HISTORIA LABORAL---------------------//

//----------------BOF  CORRESPONDENCIA---------------------//

if( $consulta == "correspondencia" && $operacion == "insertar"){
$lectura = new Leer();
$id_correspondencia = $_POST['id_correspondencia'];
$tipo_correspondencia = $_POST['tipo_correspondencia'];
$sociedad = $_POST['sociedad'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_correspondencia($id_correspondencia,$tipo_correspondencia,$sociedad,$activo);
echo $resultado;
}

if( $consulta == "correspondencia" && $operacion == "borrar"){
$lectura = new Leer();
$id_correspondencia = $_POST['id_correspondencia'];
$resultado = $lectura->borrar_correspondencia($id_correspondencia);
echo $resultado;
}

if( $consulta == "correspondencia" && $operacion == "actualizar"){
$lectura = new Leer();
$id_correspondencia = $_POST['id_correspondencia'];
$tipo_correspondencia = $_POST['tipo_correspondencia'];
$sociedad = $_POST['sociedad'];
$activo = $_POST['activo'];
$resultado = $lectura->actualizar_correspondencia($id_correspondencia,$tipo_correspondencia,$sociedad,$activo);
echo $resultado;
}

//----------------EOF  CORRESPONDENCIA---------------------//

//----------------BOF  DOCUMENATALES---------------------//

if( $consulta == "documental" && $operacion == "insertar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$id_documental = $_POST['id_documental'];
$tipo_documental = $_POST['tipo_documental'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo);
echo $resultado;
}


if( $consulta == "documental" && $operacion == "borrar"){
$lectura = new Leer();
$id_documental = $_POST['id_documental'];
$resultado = $lectura->borrar_documental($id_documental);
echo $resultado;
}

if( $consulta == "documental" && $operacion == "actualizar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$id_documental = $_POST['id_documental'];
$tipo_documental = $_POST['tipo_documental'];
$activo = $_POST['activo'];
$resultado = $lectura->actualizar_documental($sociedad,$id_correspondencia,$id_documental,$tipo_documental,$activo);
echo $resultado;
}

//----------------EOF  DOCUMENATALES---------------------//

//----------------BOF  CONSULTA---------------------//

if( $consulta == "radicado" && $operacion == "leer"){
$lectura = new Leer();
$radicado = $_POST['radicado'];
$resultado = $lectura->leer_radicado($radicado);
echo json_encode($resultado);
}

//----------------EOF  CONSULTA---------------------//

//----------------BOF  SOCIEDADES---------------------//

if( $consulta == "sociedades" && $operacion == "actualizar"){
$id_sociedad = $_POST['id_sociedad'];
$texto_sociedad = $_POST['texto_sociedad'];
$nit = $_POST['nit'];
$moneda = $_POST['moneda'];
$responsable = $_POST['responsable'];
$activo = $_POST['activo'];
$lectura = new Leer();
$resultado = $lectura->actualizar_sociedades($id_sociedad,$texto_sociedad,$nit,$moneda,$responsable,$activo);
echo $resultado;
}

if( $consulta == "sociedades" && $operacion == "insertar"){
$id_sociedad = $_POST['id_sociedad'];
$texto_sociedad = $_POST['texto_sociedad'];
$nit = $_POST['nit'];
$moneda = $_POST['moneda'];
$responsable = $_POST['responsable'];
$activo = $_POST['activo'];
$lectura = new Leer();
$resultado = $lectura->insertar_sociedades($id_sociedad,$texto_sociedad,$nit,$moneda,$responsable,$activo);
echo $resultado;
}

if( $consulta == "sociedades" && $operacion == "borrar"){
$id_sociedad = $_POST['id_sociedad'];
$lectura = new Leer();
$resultado = $lectura->borrar_sociedades($id_sociedad);
echo $resultado;
}

//----------------EOF  SOCIEDADES---------------------//

//----------------BOF  ASUNTO---------------------//

if( $consulta == "asunto" && $operacion == "insertar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$documental = $_POST['documental'];
$id_asunto = $_POST['id_asunto'];
$texto_asunto = $_POST['texto_asunto'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo);
echo $resultado;
}

if( $consulta == "documental" && $operacion == "borrar"){
$lectura = new Leer();
$id_documental = $_POST['id_documental'];
$resultado = $lectura->borrar_documental($id_documental);
echo $resultado;
}

if( $consulta == "asunto" && $operacion == "actualizar"){
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$documental = $_POST['documental'];
$id_asunto = $_POST['id_asunto'];
$texto_asunto = $_POST['texto_asunto'];
$activo = $_POST['activo'];
$resultado = $lectura->actualizar_asunto($sociedad,$id_correspondencia,$documental,$id_asunto,$texto_asunto,$activo);
echo $resultado;
}

//----------------EOF  ASUNTO---------------------//

//----------------BOF  PANTALLAS---------------------//

if( $consulta == "pantallas" && $operacion == "grabar"){
$lectura = new Leer();
$resultado = $lectura->grabar_pantallas();
echo $resultado;
}	

if( $consulta == "pantallas" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->leer_pantallas();
//echo json_encode($resultado);
echo $resultado;
}
//----------------EOF  PANTALLAS---------------------//

//----------------BOF  CORRESPONDENCIA---------------------//
/*
if( $consulta == "correspondencia" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->correspondencia_leer();
echo json_encode($resultado);
//echo $resultado;
}
*/
//----------------EOF  CORRESPONDENCIA---------------------//

//----------------BOF RUTAS---------------------//

if( $consulta == "rutas" && $operacion == "insertar"){
$year = $_POST['year'];
$lectura = new Leer();
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$id_ruta = $_POST['id_ruta'];
$directorio_archivos = $_POST['directorio_archivos'];
$activo = $_POST['activo'];
$resultado = $lectura->insertar_ruta($year,$sociedad,$id_correspondencia,$id_ruta,$directorio_archivos,$activo);
echo $resultado;
}

if( $consulta == "rutas" && $operacion == "leer"){
$lectura = new Leer();
$resultado = $lectura->leer_rutas();
//echo json_encode($resultado);
echo $resultado;
}

if( $consulta == "directorios" && $operacion == "leer"){
$year = $_POST['year'];
$sociedad = $_POST['sociedad'];
$id_correspondencia = $_POST['correspondencia'];
$lectura = new Leer();
$resultado = $lectura->leer_directorios($year,$sociedad,$id_correspondencia);
//echo json_encode($resultado);
echo $resultado;
}

//----------------EOF RUTAS---------------------//

//----------------BOF ANEXOS---------------------//
if( $consulta == "anexos" && $operacion == "leer_max"){
$lectura = new Leer();
$radicado = $_POST['radicado'];
$total_anexos = $lectura->leer_max_anexos($radicado);
echo $total_anexos;
}

if( $consulta == "anexos" && $operacion == "leer"){
$lectura = new Leer();
$radicado = $_POST['radicado'];
$resultado = $lectura->leer_anexos($radicado);
//echo json_encode($resultado);
echo $resultado;
}

//----------------EOF ANEXOS---------------------//


?>