<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Checkout example · Bootstrap v5.0</title>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

		 <style>
.autocomplete {
  position: relative;
  display: inline-block;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
.autocomplete2 {
  position: relative;
  display: inline-block;
}
.autocomplete2-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete2-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete2-items div:hover {
  background-color: #e9e9e9;
}
.autocomplete2-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
		 </style>
<?php
$id_sociedad = $_POST["sociedad"];
$id_corresp = $_POST["correspondencia"];
$fecha = new DateTime('NOW');
$year = date("Y");
$lr_tmsp = $fecha->getTimestamp();
$lr_fecha = date("d.m.Y");
$lr_hora = date("H:i:s");

$servername = "localhost";
$dbname = "marthadd_eurodocweb";
$usr = "marthadd_eurodocweb";
$pwd = "Myp4r7n3r+1";
$conect = new mysqli($servername, $usr, $pwd, $dbname);

$settings = array();
$sql_leer = $conect->query("SELECT * FROM pantalla");
if ($sql_leer->num_rows > 0) {
  while($columna = $sql_leer->fetch_assoc()) {
    array_push($settings, $columna['campo'], $columna['mostrar']);
	}
} else {
  echo "0 results";
}

?>

  </head>
  <body class="bg-light">
    
<div class="container">
  <main>
			<div class="row">
          <div class="row">
		  <?php $soc_mos = array_search("Sociedad",$settings);if($settings[$soc_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="firstName" class="form-label" id="sociedad_lbl">Sociedad</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="sociedad_inp" placeholder="" value="<?php echo $id_sociedad; ?>" disabled>
            </div>
		  <?php } ?>

		  <?php $corr_mos = array_search("Correspondencia",$settings);if($settings[$corr_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="lastName" class="form-label" id="corresp_lbl">Correspondencia</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="corresp_inp" placeholder="" value="<?php echo $id_corresp; ?>" disabled>
            </div>
		  <?php } ?>
			</div>

		  <?php $radicado_mos = array_search("radicado",$settings);if($settings[$radicado_mos+1] == 0){ ?>
          <div class="row">
            <div class="col-sm-2">
              <label for="Numero_radicado" class="form-label"># radicado</label>
            </div>
            <div class="col-sm-3">
              <!--input type="text" class="form-control" id="Numero_radicado" placeholder="" value="php echo $lr_tmsp disabled-->
              <input type="text" class="form-control" id="Numero_radicado" placeholder="" value="" disabled>
            </div>
		  <?php } ?>
			
		  <?php $estado_mos = array_search("estado",$settings);if($settings[$estado_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="Estado_radicado" class="form-label">Estado</label>
            </div>
            <div class="btn-group col-sm-3 dropdown">
			<button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="btn_estat"> &nbsp;</button>
			<ul class="dropdown-menu" id="btn_estado" aria-labelledby="btn_soc">
				<li><a class="dropdown-item" href="#" onclick="actualizar_estado('Abierto')">Abierto</a></li>
				<li><a class="dropdown-item" href="#" onclick="actualizar_estado('Cerrado')">Cerrado</a></li>
				<li><a class="dropdown-item" href="#" onclick="actualizar_estado('Retirado')">Retirado</a></li>
				<li><a class="dropdown-item" href="#" onclick="actualizar_estado('Anulado')">Anulado</a></li>
			</ul>
            </div>
          </div>
		  <?php } ?>

          <div class="row">
		  <?php $creado_mos = array_search("creado",$settings);if($settings[$creado_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="creado_por" class="form-label">Creado por</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="creado_por" placeholder="" value="PDANIELS" disabled>
            </div>
            <div class="col-sm-2">
              <label for="creado_por" class="form-label">el</label>
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="creado_fecha" placeholder="" value="<?php echo $lr_fecha; ?>" disabled>
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="creado_hora" placeholder="" value="<?php echo $lr_hora; ?>" disabled>
            </div>
		  <?php } ?>
          </div>

          <div class="row">
		  <?php $modificado_mos = array_search("modificado",$settings);if($settings[$modificado_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="creado_por" class="form-label">Modificado por</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="modificado_por" placeholder="" value="" disabled>
            </div>
            <div class="col-sm-2">
              <label for="creado_por" class="form-label">el</label>
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="modificado_fecha" placeholder="" value="" disabled>
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="modificado_hora" placeholder="" value="" disabled>
            </div>
		  <?php } ?>
     		</div>

			<div class="row">
			<div class="col-sm-8">
              <label for="espacio" class="form-label"> &nbsp;</label>
            </div>
            </div>

			<div class="row mb-3" style="background-color:#EEE;border-radius:5px;">
		  <?php $documental_mos = array_search("documental",$settings);if($settings[$documental_mos+1] == 0){ ?>
			<div class="row">
			<div class="col-sm-2">
              <label for="btn_documental" class="form-label">Tipo documental</label>
            </div>
            <div class="btn-group col-sm-3 dropdown">
		  	<button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="btn_docu"> &nbsp;</button>
				<ul class="dropdown-menu" aria-labelledby="btn_docu" id="btn_documental"></ul>
            </div>
		  <?php } ?>

		  <?php $asunto_mos = array_search("asunto",$settings);if($settings[$asunto_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="btn_asunto" class="form-label">Asunto</label>
            </div>
            <div class="btn-group col-sm-3 dropdown">
			<button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="btn_ast"> &nbsp;</button>
				<ul class="dropdown-menu" aria-labelledby="btn_ast" id="btn_asunto"></ul>
            </div>
            </div>
		  <?php } ?>

			<div class="row">
		  <?php $comunicacion_mos = array_search("comunicacion",$settings);if($settings[$comunicacion_mos+1] == 0){ ?>
			<div class="col-sm-2">
              <label for="comunicacion" class="form-label">Número de comunicación</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="comunicacion" placeholder="" value="">
            </div>
		  <?php } ?>

		  <?php $fecha_mos = array_search("fecha",$settings);if($settings[$fecha_mos+1] == 0){ ?>
            <div class="col-sm-2">
              <label for="fecha_documento" class="form-label">Fecha Documento</label>
            </div>
            <div class="col-sm-3">
			  <input type="date" id="fecha_documento" placeholder="" class="form-control" value="2018-07-22">
            </div>
		  <?php } ?>
            </div>

			<div class="row">
		  <?php $identificacion_mos = array_search("identificacion",$settings);if($settings[$identificacion_mos+1] == 0){ ?>
			<div class="col-sm-2">
              <label for="identificacion" class="form-label">Identificación</label>
            </div>
			<div class="autocomplete col-sm-2">
			<input class="form-control" id="identificacion" type="text" name="identificacion" placeholder="#id" onclick="completar_identificaciones()">
			</div>
			<div class="col-sm-1">
				<button class="w-30 btn btn-success btn-mb" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="llenar_tabla()"><i class="fas fa-search-plus"></i></button>
            </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModall" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal1">Seleccione un empleado</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<table style="width:100%" id="tabla1"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="displayRadioValue()">Seleccionar</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
		  <?php } ?>
		  <?php $empleado_mos = array_search("empleado",$settings);if($settings[$empleado_mos+1] == 0){ ?>
			<div class="col-sm-2">
              <label for="empleado" class="form-label">Empleado</label>
            </div>
			<div class="autocomplete2 col-sm-3">
			<input class="form-control" id="empleado" type="text" name="empleado" placeholder="nombre/apellido" onclick="completar_empleados()">
			</div>
			<div class="col-sm-1">
				<button class="w-30 btn btn-success btn-mb" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-search-plus"></i></button>
            </div>
		  <?php } ?>
            </div>

			<div class="row">
		  <?php $descripcion_mos = array_search("descripcion",$settings);if($settings[$descripcion_mos+1] == 0){ ?>
			<div class="col-sm-2">
              <label for="descripcion" class="form-label">Descripción</label>
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="descripcion" placeholder="" value="">
            </div>
		  <?php } ?>

            <div class="col-sm-5">
              <label for="blanco" class="form-label"> &nbsp; &nbsp; </label>
            </div>

			<div class="row">
			<div class="col-lg-11">
              <label for="blanco" class="form-label"> &nbsp; &nbsp; </label>
			</div>
			</div>
			
			<div class="row">
			<div class="col-lg-7" id="mensaje">
			</div>
			<div class="col-lg-4">
				<button class="w-150 btn btn-primary btn-lg float-end" id="grabar_radicado" onclick="grabar_radicado()"><i class="fas fa-save"></i> &nbsp; Grabar</button>
            </div>
			</div>

			<div class="row">
			<div class="col-lg-11">
              <label for="blanco" class="form-label"> &nbsp; &nbsp; </label>
			</div>
			</div>
			
		  <?php $anexo_mos = array_search("anexo",$settings);if($settings[$anexo_mos+1] == 0){ ?>		  
			<div class="row">
			<div class="col-sm-2">
			<button class="w-60 btn btn-success btn-mb" id="cantidad_anexos" onclick="abrir_anexos(<?php echo $lr_tmsp ?>)" style="display:none">
			<i class="fa fa-folder-open" aria-hidden="true"></i> &nbsp; <span id="numero_anexos">0</span> anexos</button>
            </div>
			<div class="col-sm-4">
			<div class="custom-file">
			<input id="fileToUpload" type="file" name="fileToUpload" class="form-control" style="display:none">
			</div>
			</div>
            <div class="btn-group col-sm-3 dropdown">
			<button type="button" class="btn btn-sm btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="btn_tipo_anexo" style="display:none">Directorio de archivos</button>
				<ul class="dropdown-menu" id="dd_anexo" aria-labelledby="btn_tipo_anexo"></ul>
			</div>
			<div class="col-sm-2">
			<!--button class="w-60 btn btn-success btn-mb" id="upload3" onclick="anexar(< echo $lr_tmsp )" style="display:none"-->
			<button class="w-60 btn btn-success btn-mb" id="upload3" onclick="validar_directorio()" style="display:none">
			<i class="fas fa-paperclip"></i> Anexar</button>
            </div>
            </div>
		  <?php } ?>

		  <?php $anexo_mos = array_search("anexo",$settings);if($settings[$anexo_mos+1] == 0){ ?>
			<iframe src="" width="100%" height="600px" id="ifr1"/>
		  <?php } ?>
  </main>  
</div>
  </body>
</html>
