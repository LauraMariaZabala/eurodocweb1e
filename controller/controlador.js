$(document).ready(function(){
  $("#radicados_crear").click(function(){
    $("#div1").load("radicar.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	leer_sociedades();
	leer_correspondencias();
	ws_empleados();
	}
  });
});
$(document).ready(function(){
  $("#consulta").click(function(){
    $("#div1").load("consultar.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	cargar_pantallas();
	}
  });
});
$(document).ready(function(){
  $("#crear_soc").click(function(){
    $("#div1").load("sociedades.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	refrescar_resultados();
	}
  });
});
$(document).ready(function(){
  $("#TiposCorrespondencia").click(function(){
    $("#div1").load("correspondencia.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
		leer_sociedades();
		resultados_correspondencia();
	}
  });
});
$(document).ready(function(){
  $("#TiposDocumentales").click(function(){
    $("#div1").load("documentales.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	leer_sociedades();
	leer_correspondencias();
	resultados_documentales();
	}
  });
});
$(document).ready(function(){
  $("#Asunto").click(function(){
    $("#div1").load("asunto.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	leer_sociedades();
	leer_correspondencias();
	leer_documentales();
	resultados_asuntos();
	}
  });
});
$(document).ready(function(){
  $("#conf_pantallas").click(function(){
    $("#div1").load("pantallas.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
			leer_pantallas();
	}
	});
});
$(document).ready(function(){
  $("#rutas").click(function(){
    $("#div1").load("rutas.html");
	console.log(document.readyState);
	if(document.readyState === "complete"){
	leer_sociedades();
	leer_correspondencias();
	resultados_rutas()
	}
	});
});

//--------------------------------------CONSULTAR----------------------

function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        complete: function (xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}
/*
function validar(nombre_completo){
	UrlExists(nombre_completo, function (status){
    if (status === 200) {
		x = "bien";
    } else if (status === 404) {
		document.getElementById("ifr1").style.display = "none";
		x = "mal";
    } else {
		x = "nose";
    }
	});
		return "bien";
}
*/
function buscar_radicado(){
	var Numero_radicado = document.getElementById("Numero_radicado").value;	
	$.post("controller/modelo.php", { consulta: 'anexos', operacion: 'leer_max', radicado:Numero_radicado }, function(data) {
		document.getElementById("numero_anexos").innerHTML = data;
	});
	$.post("controller/modelo.php", { consulta: 'radicado', operacion: 'leer', radicado:Numero_radicado }, function(data) {
        returnData = data;
		console.log("debug radicado =");
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL.length);
		document.getElementById("Numero_radicado").value = lr_SQL[0][0];
		document.getElementById("sociedad_inp").value = lr_SQL[0][1];
		document.getElementById("corresp_inp").value = lr_SQL[0][2];
		document.getElementById("Estado_radicado").value = lr_SQL[0][3];
		document.getElementById("creado_por").value = lr_SQL[0][4];
		document.getElementById("creado_fecha").value = lr_SQL[0][5];
		document.getElementById("creado_hora").value = lr_SQL[0][6];
		document.getElementById("modificado_por").value = lr_SQL[0][7];
		document.getElementById("modificado_fecha").value = lr_SQL[0][8];
		document.getElementById("modificado_hora").value = lr_SQL[0][9];
		document.getElementById("documental").value = lr_SQL[0][10];
		document.getElementById("asunto").value = lr_SQL[0][11];
		document.getElementById("comunicacion").value = lr_SQL[0][12];
		document.getElementById("fecha_documento").value = lr_SQL[0][13];
		document.getElementById("identificacion").value = lr_SQL[0][14];
		document.getElementById("empleado").value = lr_SQL[0][15];
		document.getElementById("descripcion").value = lr_SQL[0][16];

		leer_directorios(lr_SQL[0][1],lr_SQL[0][2]);
		
		extensiones = ['png','gif','pdf','jpg','doc','docx'];
		for(a = 0; a < extensiones.length; a++){
		nombre_completo = '../others/anexos/' + lr_SQL[0][0] + '.' + extensiones[a];

		document.getElementById("ifr1").style.display = "none";
	UrlExists(nombre_completo, function (status){
    if (status === 200) {
		document.getElementById("ifr1").src = nombre_completo;
		document.getElementById("ifr1").style.display = "block";
    } 
	});
		}
	});
}

function cargar_pantallas(){
	$.post("controller/modelo.php", { consulta: 'pantallas', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log("debug1");
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log("debug2");
		console.log(lr_SQL);
		for(var i = 0; i < lr_SQL.length; i++){
		switch (lr_SQL[i][0]) {
		case "Sociedad":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("sociedad_lbl").style.display = "none";
		document.getElementById("sociedad_inp").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("sociedad_lbl").style.display = "block";
		document.getElementById("sociedad_inp").style.display = "block";
			}
	    break;
		case "Correspondencia":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("corresp_lbl").style.display = "none";
		document.getElementById("corresp_inp").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("corresp_lbl").style.display = "block";
		document.getElementById("corresp_inp").style.display = "block";
			}
	    break;
		case "radicado":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("radicado_lbl").style.display = "none";
		document.getElementById("Numero_radicado").style.display = "none";
		document.getElementById("buscar").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("radicado_lbl").style.display = "block";
		document.getElementById("Numero_radicado").style.display = "block";
		document.getElementById("buscar").style.display = "block";
			}
	    break;
		case "estado":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("Estado_radicado").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("Estado_radicado").style.display = "block";
			}
	    break;
		case "creado":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("creado_lbl").style.display = "none";
		document.getElementById("creado_por").style.display = "none";
		document.getElementById("creado_el").style.display = "none";
		document.getElementById("creado_fecha").style.display = "none";
		document.getElementById("creado_hora").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("creado_lbl").style.display = "block";
		document.getElementById("creado_por").style.display = "block";
		document.getElementById("creado_el").style.display = "block";
		document.getElementById("creado_fecha").style.display = "block";
		document.getElementById("creado_hora").style.display = "block";
			}
	    break;
		case "modificado":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("modificado_lbl").style.display = "none";
		document.getElementById("modificado_por").style.display = "none";
		document.getElementById("modificado_el").style.display = "none";
		document.getElementById("modificado_fecha").style.display = "none";
		document.getElementById("modificado_hora").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("modificado_lbl").style.display = "block";
		document.getElementById("modificado_por").style.display = "block";
		document.getElementById("modificado_el").style.display = "block";
		document.getElementById("modificado_fecha").style.display = "block";
		document.getElementById("modificado_hora").style.display = "block";
			}
	    break;
		case "Correspondencia":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("documental_lbl").style.display = "none";
		document.getElementById("documental").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("documental_lbl").style.display = "block";
		document.getElementById("documental").style.display = "block";
			}
	    break;
		case "asunto":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("asunto_lbl").style.display = "none";
		document.getElementById("asunto").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("asunto_lbl").style.display = "block";
		document.getElementById("asunto").style.display = "block";
			}
	    break;
		case "comunicacion":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("comunicacion_lbl").style.display = "none";
		document.getElementById("comunicacion").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("comunicacion_lbl").style.display = "block";
		document.getElementById("comunicacion").style.display = "block";
			}
	    break;
		case "comunicacion":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("comunicacion_lbl").style.display = "none";
		document.getElementById("comunicacion").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("comunicacion_lbl").style.display = "block";
		document.getElementById("comunicacion").style.display = "block";
			}
	    break;
		case "fecha":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("fecha_lbl").style.display = "none";
		document.getElementById("fecha_documento").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("fecha_lbl").style.display = "block";
		document.getElementById("fecha_documento").style.display = "block";
			}
	    break;
		case "identificacion":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("identificacion_lbl").style.display = "none";
		document.getElementById("identificacion").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("identificacion_lbl").style.display = "block";
		document.getElementById("identificacion").style.display = "block";
			}
	    break;
		case "empleado":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("empleado_lbl").style.display = "none";
		document.getElementById("empleado").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("empleado_lbl").style.display = "block";
		document.getElementById("empleado").style.display = "block";
			}
	    break;
		case "descripcion":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("descripcion_lbl").style.display = "none";
		document.getElementById("descripcion").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("descripcion_lbl").style.display = "block";
		document.getElementById("descripcion").style.display = "block";
			}
	    break;
		case "anexo":
			if(lr_SQL[i][1] == 1 ){
		document.getElementById("ifr1").style.display = "none";
			}
			if(lr_SQL[i][1] == 0 ){
		document.getElementById("ifr1").style.display = "block";
			}
	    break;
		}
		}
	});
	}

//--------------------------------------RADICAR----------------------
var ids = [];
var nombre = [];
var sociedad = "";
var cod_sociedad = "";
var correspondencia = "";
var asunto = "";
var estado = "";
var lr_txt_tabla = "";
var cod_correspond = "";
var directorio = "";

function actualizar_boton(z){
	document.getElementById('btn_soc').innerHTML = z;
	sociedad = z;
}

function actualizar_correspondencia(r){
	document.getElementById('btn_corresp').innerHTML = r;
	correspondencia = r;
}

function actualizar_asunto(e){
	document.getElementById('btn_ast').innerHTML = e;
	asunto = e;
}

function actualizar_estado(y){
	document.getElementById('btn_estat').innerHTML = y;
	estado = y;
}

function actualizar_documental(t){
	document.getElementById('btn_docu').innerHTML = t;
	documental = t;
}

function actualizar_rutas(u){
	document.getElementById('btn_tipo_anexo').innerHTML = u;
	directorio = u;
}

function leer_sociedades(){
	$.post("controller/modelo.php", { consulta: 'sociedades', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		for(var i = 0; i < lr_SQL.length; i++){
			if(lr_SQL[i][1] == 1 ){
		var createA = document.createElement('a');
		createA.setAttribute('class', "dropdown-item");
		createA.setAttribute('id', "soc_"+i);
		createA.setAttribute("onclick","actualizar_boton('" + lr_SQL[i][0] + "');cod_sociedad = '" + lr_SQL[i][2] + "';");
		var createAText = document.createTextNode(lr_SQL[i][0]);
		createA.appendChild(createAText);
		document.getElementById('btn_sociedad').appendChild(createA);
			}
		}
	});
}

function leer_correspondencias(){
	$.post("controller/modelo.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data2) {
        returnData2 = data2;
		console.log(data2);
		lr_SQL2 = JSON.parse(data2);
		console.log(lr_SQL2.length);
		for(var i2=0; i2 < lr_SQL2.length; i2++){
			if(lr_SQL2[i2][3] == 1 ){
		var createB = document.createElement('a');
		createB.setAttribute('class', "dropdown-item");
		createB.setAttribute('id', "corr_"+i2);
		createB.setAttribute("onclick","actualizar_correspondencia('" + lr_SQL2[i2][1] + "');cod_correspond='" + lr_SQL2[i2][0] + "';");
		var createBText = document.createTextNode(lr_SQL2[i2][1]);
		createB.appendChild(createBText);
		document.getElementById('btn_correspondencia').appendChild(createB);
			}
		}
	});
}

function leer_documentales(){
	$.post("controller/modelo.php", { consulta: 'documental', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL[0][4]);
		console.log(lr_SQL.length);
		for(i=0;i < lr_SQL.length;i++){
			if(lr_SQL[i][4] == 1 ){
		var createB = document.createElement('a');
		createB.setAttribute('class', "dropdown-item");
		createB.setAttribute('id', "ast_"+i);
		createB.setAttribute("onclick","actualizar_documental('" + lr_SQL[i][3] + "')");
		var createBText = document.createTextNode(lr_SQL[i][3]);
		createB.appendChild(createBText);
		document.getElementById('btn_documental').appendChild(createB);
			}
		}
	});
}

function leer_asuntos(){
	$.post("controller/modelo.php", { consulta: 'asuntos', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = data;
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL[0][5]);
		console.log(lr_SQL.length);
		for(i=0;i < lr_SQL.length;i++){
			if(lr_SQL[i][5] == 1 ){
		var createB = document.createElement('a');
		createB.setAttribute('class', "dropdown-item");
		createB.setAttribute('id', "ast_"+i);
		createB.setAttribute("onclick","actualizar_asunto('" + lr_SQL[i][4] + "')");
		var createBText = document.createTextNode(lr_SQL[i][4]);
		createB.appendChild(createBText);
		document.getElementById('btn_asunto').appendChild(createB);
			}
		}
	});
}
/*
$(function(){ // SI PRESIONAN ENTER
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});
*/

	function historia_laboral(){
		// Data Picker Initialization
		if(correspondencia == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(sociedad !== "" && correspondencia !== ""){
		$.post("historia_laboral.php",{sociedad:sociedad,correspondencia:correspondencia}, function(data2) {	
		document.getElementById('div1').innerHTML = data2;
		leer_documentales();
		leer_asuntos();
		leer_directorios(sociedad,correspondencia);
		});
		}
	}

	  function validar_directorio(){
		if(document.getElementById('btn_tipo_anexo').innerHTML === "Directorio de archivos"){
			document.getElementById('mensaje').innerHTML = 
			"<div class='alert alert-danger small fade show p-2' role='alert'>" + 
			"<svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'>" + 
			"<use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un Directorio de archivos</div>";
		}else{
//			ls_file = document.getElementById('Numero_radicado').value = lr_SQL[1];
			ls_file = document.getElementById('Numero_radicado').value;
			ls_folder = document.getElementById('btn_tipo_anexo').innerHTML;
			anexar(ls_file,ls_folder);
		}
		}

	  function anexar(c,f){
    var file_data = $('#fileToUpload').prop('files')[0];
	var lr_ext = file_data['name'].split('.').pop();
	var nombre_completo = c + "." + lr_ext;
    var form_data = new FormData();
    form_data.append('lr_archivo', c);
    form_data.append('lr_directorio', f);
    form_data.append('lr_ext', lr_ext);
    form_data.append('file', file_data);
    form_data.append('lr_radicado', document.getElementById('Numero_radicado').value);
//    alert(form_data);                    
    $.ajax({
        url: 'controller/upload.php', // <-- point to server-side PHP script 
        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
		lr_SQL = JSON.parse(php_script_response);
//		console.log(lr_SQL);
//            alert(php_script_response); // <-- display response from the PHP script, if any
			document.getElementById('mensaje').innerHTML = 
			"<div class='alert alert-success small fade show p-2' role='alert'>" + 
			"<svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'>" + 
			"<use xlink:href='#exclamation-triangle-fill'/></svg>" + lr_SQL[0] + "</div>";
			document.getElementById('numero_anexos').innerHTML = lr_SQL[1];
			validar(nombre_completo);
		}
     });
	  }

	  function grabar_radicado(){
cod_rad = document.getElementById('Numero_radicado').value;
//cod_soc = sociedad;
texto_sociedad = sociedad;
cod_soc = cod_sociedad;
//cod_correspondencia = correspondencia;
texto_correspondencia = correspondencia;
cod_correspondencia = cod_correspond;
estado = estado;
creado_por = document.getElementById('creado_por').value;
fecha_creado = document.getElementById('creado_fecha').value;
hora_creado = document.getElementById('creado_hora').value;
modificado_por = document.getElementById('modificado_por').value;
fecha_modificado = document.getElementById('modificado_fecha').value;
hora_modificado = document.getElementById('modificado_hora').value;
tipo_documental = documental;
asunto = asunto;
comunicacion = document.getElementById('comunicacion').value;
fecha_documento = document.getElementById('fecha_documento').value;
identificacion = document.getElementById('identificacion').value;
empleado = document.getElementById('empleado').value;
descripcion = document.getElementById('descripcion').value;

$.post("controller/modelo.php", { consulta: 'radicado', operacion: 'crear',
cod_rad:cod_rad,cod_soc:cod_soc,texto_sociedad:sociedad,cod_correspondencia:cod_correspondencia,texto_correspondencia:correspondencia,
estado:estado,creado_por:creado_por,fecha_creado:fecha_creado,hora_creado:hora_creado,
modificado_por:modificado_por,fecha_modificado:fecha_modificado,hora_modificado:hora_modificado,tipo_documental:tipo_documental,asunto:asunto,
comunicacion:comunicacion,fecha_documento:fecha_documento,identificacion:identificacion,empleado:empleado,descripcion:descripcion }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		for(i=0;i < lr_SQL.length;i++){
		if(lr_SQL[0] == "1"){ //radicado creado
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>Radicado " + lr_SQL[1] + " creado correctamente</div>";
		document.getElementById('cantidad_anexos').style.display = "block";
		document.getElementById('fileToUpload').style.display = "block";
		document.getElementById('btn_tipo_anexo').style.display = "block";
		document.getElementById('upload3').style.display = "block";
		document.getElementById('Numero_radicado').value = lr_SQL[1];
		}
		if(lr_SQL[0] == "2"){ //error
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#check-circle-fill'/></svg>" + lr_SQL[1] + "</div>";
		}
		}
	});
	  }

function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        complete: function (xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}

function validar(nombre_completo){
//UrlExists('../eurodocweb1d/Radicar/uploads/<?php echo $lr_tmsp ?>.pdf', function (status){
UrlExists('../eurodocweb1d/Radicar/uploads/' + nombre_completo, function (status){
//	document.getElementById("ifr1").src = "../eurodocweb1d/Radicar/uploads/<?php echo $lr_tmsp ?>.pdf";
	document.getElementById("ifr1").src = "../eurodocweb1d/Radicar/uploads/" + nombre_completo;
    if (status === 200) {
        // Execute code if successful
//		alert("bien");
		document.getElementById("ifr1").style.display = "block";
    } else if (status === 404) {
        // Execute code if not successful
		document.getElementById("ifr1").style.display = "none";
//		alert("mal");
    } else {
        // Execute code if status doesn't match above
//		alert("nose");
    }
});
}

function ws_empleados(){
	$.post("others/ws_rest/curl.php", { consulta: 'sociedades', operacion: 'leer' }, function(data) {
/*
		lr_txt_tabla = "<tr><th></th><th>Identificación</th><th>Nombre</th></tr>" +
		"<tr><td><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1'>" +
		"</td><td>799014723</td><td>Pablo Daniels2</td></tr>" +
		"<tr><td><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault2'>" +
		"</td><td>1234344</td><td>Prueba</td></tr>";*/
		lr_txt_tabla = "<tr><th></th><th>Identificación</th><th>Nombre</th></tr>";
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL.data);
		for(i=0;i < lr_SQL.data.length;i++){
		ids[i] = lr_SQL.data[i].ip;
		nombre[i] = lr_SQL.data[i].firstname + " " + lr_SQL.data[i].lastname;
		lr_txt_tabla = lr_txt_tabla + "<tr><td><input class='form-check-input' type='radio' name='flexRadioDefault' id='id_" + i +
		"' value='" + lr_SQL.data[i].firstname + " " + lr_SQL.data[i].lastname + "'></td><td>" + 
		lr_SQL.data[i].ip + "</td><td>" + lr_SQL.data[i].firstname + " " + lr_SQL.data[i].lastname + 
		"<input type='hidden' value='" + lr_SQL.data[i].ip + "' id='hid_" + i + "'/></td></tr>";
		}
		});	
}

function llenar_tabla(){
		document.getElementById("tabla1").innerHTML = lr_txt_tabla;
}

function displayRadioValue(){
            var ele = document.getElementsByName('flexRadioDefault');
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
					document.getElementById("empleado").value = ele[i].value;
					document.getElementById("identificacion").value = document.getElementById("hid_" + i).value;
//                alert("seleccionado: " + ele[i].value);
//                console.log(ele[i]);
            }
        }
}		
		
function completar_identificaciones(){
var arr = ids;
console.log(arr);
//var arr = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  var inp = document.getElementById('identificacion');
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

function completar_empleados(){
var arr2 = nombre;
console.log(arr2);
//var arr = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus2;
  /*execute a function when someone writes in the text field:*/
  var inp2 = document.getElementById('empleado');
  inp2.addEventListener("input", function(e2) {
      var a2, b2, i2, val2 = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists2();
      if (!val2) { return false;}
      currentFocus2 = -1;
      /*create a DIV element that will contain the items (values):*/
      a2 = document.createElement("DIV");
      a2.setAttribute("id", this.id + "autocomplete2-list");
      a2.setAttribute("class", "autocomplete2-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a2);
      /*for each item in the array...*/
      for (i2 = 0; i2 < arr2.length; i2++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr2[i2].substr(0, val2.length).toUpperCase() == val2.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b2 = document.createElement("DIV");
          /*make the matching letters bold:*/
          b2.innerHTML = "<strong>" + arr2[i2].substr(0, val2.length) + "</strong>";
          b2.innerHTML += arr2[i2].substr(val2.length);
          /*insert a input field that will hold the current array item's value:*/
          b2.innerHTML += "<input type='hidden' value='" + arr2[i2] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b2.addEventListener("click", function(e2) {
              /*insert the value for the autocomplete text field:*/
              inp2.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists2();
          });
          a2.appendChild(b2);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp2.addEventListener("keydown", function(e2) {
      var x2 = document.getElementById(this.id + "autocomplete2-list");
      if (x2) x2 = x2.getElementsByTagName("div");
      if (e2.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus2++;
        /*and and make the current item more visible:*/
        addActive2(x2);
      } else if (e2.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus2--;
        /*and and make the current item more visible:*/
        addActive2(x2);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e2.preventDefault();
        if (currentFocus2 > -1) {
          /*and simulate a click on the "active" item:*/
          if (x2) x2[currentFocus2].click();
        }
      }
  });
  function addActive2(x2) {
    /*a function to classify an item as "active":*/
    if (!x2) return false;
    /*start by removing the "active" class on all items:*/
    removeActive2(x2);
    if (currentFocus2 >= x2.length) currentFocus2 = 0;
    if (currentFocus2 < 0) currentFocus2 = (x2.length - 1);
    /*add class "autocomplete-active":*/
    x2[currentFocus2].classList.add("autocomplete2-active");
  }
  function removeActive2(x2) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i2 = 0; i2 < x2.length; i2++) {
      x2[i2].classList.remove("autocomplete2-active");
    }
  }
  function closeAllLists2(elmnt2) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x2 = document.getElementsByClassName("autocomplete2-items");
    for (var i2 = 0; i2 < x2.length; i2++) {
      if (elmnt2 != x2[i2] && elmnt2 != inp2) {
      x2[i2].parentNode.removeChild(x2[i2]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e2) {
    closeAllLists2(e2.target);
});
}

//----------------------------------------------SOCIEDADES----------------------//
var activo = 1;

function validar_activo(y){
//		alert(activo);
if(y === "Activo"){
	activo = 1;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
}else{
	activo = 2;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
}
}

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#continuar").click(function(){
//	  alert(document.getElementById('lr_control').value);
	  if( document.getElementById('lr_control').value == "actualizar" ){ //ACTUALZAR SOCIEDAD
        id_sociedad = document.getElementById('id_sociedad').value;
	    texto_sociedad = document.getElementById('texto_sociedad').value;
	    nit = document.getElementById('nit').value;
	    moneda = document.getElementById('moneda').value;
	    responsable = document.getElementById('responsable').value;
		$.post("controller/modelo.php", {consulta: 'sociedades', operacion: 'actualizar', id_sociedad: id_sociedad,texto_sociedad: texto_sociedad, nit: nit, moneda: moneda, responsable: responsable, activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("controller/modelo.php", { consulta: 'sociedades', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		refrescar_resultados();
		});	
	  }else{ //INSERTAR NUEVA SOCIEDAD
        id_sociedad = document.getElementById('id_sociedad').value;
	    texto_sociedad = document.getElementById('texto_sociedad').value;
	    nit = document.getElementById('nit').value;
	    moneda = document.getElementById('moneda').value;
	    responsable = document.getElementById('responsable').value;
		$.post("controller/modelo.php", {consulta: 'sociedades', operacion: 'insertar', id_sociedad: id_sociedad,texto_sociedad: texto_sociedad, nit: nit, moneda: moneda, responsable: responsable, activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("controller/modelo.php", { consulta: 'sociedades', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		});	
		refrescar_resultados();
	  }
  });
});	

function actualizar(x,y){
        document.getElementById('mensaje').innerHTML = "";
     document.getElementById('lr_control').value = "actualizar";
		for( var i = 0; i < lr_SQL.length; i++ ) {
		if( lr_SQL[i][0] === x ) {
        console.log(lr_SQL[i]);
		document.getElementById('id_sociedad').value = lr_SQL[i][0];
		document.getElementById('texto_sociedad').value = lr_SQL[i][1];
		document.getElementById('nit').value = lr_SQL[i][2];
		document.getElementById('moneda').value = lr_SQL[i][3];
		document.getElementById('responsable').value = lr_SQL[i][4];
		if(lr_SQL[i][5] == 2){ 
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		}else{ 
		document.getElementById('success-outlined').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		}		
        break;
		}
		}	  
}

function borrar(x){
		$.post("controller/modelo.php", {consulta: 'sociedades', operacion: 'borrar', id_sociedad: x}, function(data) {
		console.log(data);
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("controller/modelo.php", { consulta: 'sociedades', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		refrescar_resultados();
		});	
}


function refrescar_resultados(){
$.post("controller/modelo.php", { consulta: 'sociedades2', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		lr_resultados = "<div class='row'><BR><P>";
		for(i = 0;i < lr_SQL.length;i++){
		if(lr_SQL[i][5] == 2){ lr_icono = "<i class='fas fa-toggle-off'></i> Inactivo"}
		else{ lr_icono = "<i class='fas fa-toggle-on'></i> Activo" }
		lr_resultados = lr_resultados + "<div class='col-sm-2'>" + lr_SQL[i][0] + "</div><div class='col-sm-3'>" + lr_SQL[i][1] + "</div>"
		+ "<div class='col-sm-2'>" + lr_icono + "</div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-success' id='Editar' onclick='actualizar(\"" + lr_SQL[i][0] + "\",\"" + lr_SQL[i][1] + "\")'>"
		+ "<i class='fas fa-edit'></i> &nbsp;Editar</button></div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-danger' id='Borrar' onclick='borrar(\"" + lr_SQL[i][0] + "\")'>"
		+ "<i class='fas fa-trash-alt'></i> &nbsp;Borrar</button></div>";
		}
		lr_resultados = lr_resultados + "</div>";
		document.getElementById('resultados').innerHTML = lr_resultados;
});	
}

$(function(){ // SI PRESIONAN ENTER
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#nuevo").click(function(){
        document.getElementById('lr_control').value = "insertar";
		document.getElementById('id_sociedad').value = "";
		document.getElementById('texto_sociedad').value = "";
		document.getElementById('nit').value = "";
		document.getElementById('moneda').value = "";
		document.getElementById('responsable').value = "";
		document.getElementById('mensaje').innerHTML = "";
		document.getElementById('success-outlined').checked = false;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
});
});

//--------------------------------------------PANTALLAS----------------------------------------//
function leer_pantallas(){
$.post("controller/modelo.php", { consulta: 'pantallas', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log("debug1");
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log("debug2");
		console.log(lr_SQL);

	  var soc_radio = document.getElementsByName('soc_radio');
	  var corr_radio = document.getElementsByName('corr_radio');
	  var estado_radio = document.getElementsByName('estado_radio');
	  var radicado_radio = document.getElementsByName('radicado_radio');
	  var creado_por_radio = document.getElementsByName('creado_por_radio');
	  var modificado_radio = document.getElementsByName('modificado_radio');
	  var documental_radio = document.getElementsByName('documental_radio');
	  var asunto_radio = document.getElementsByName('asunto_radio');
	  var comunicacion_radio = document.getElementsByName('comunicacion_radio');
	  var fecha_radio = document.getElementsByName('fecha_radio');
	  var identificacion_radio = document.getElementsByName('identificacion_radio');
	  var empleado_radio = document.getElementsByName('empleado_radio');
	  var descripcion_radio = document.getElementsByName('descripcion_radio');
	  var anexo_radio = document.getElementsByName('anexo_radio');

		for(i = 0;i < lr_SQL.length;i++){		
  switch (lr_SQL[i][0]) {
  case "Sociedad":
		if( lr_SQL[i][1] == 0){ 
        document.getElementsByName('soc_radio').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('success-outlined').checked = true;
		}else{
	    document.getElementsByName('soc_radio').checked = false;
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		}		
    break;
  case "Correspondencia":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined2').checked = false;
		document.getElementById('success-outlined2').checked = true;
		}else{
		document.getElementById('danger-outlined2').checked = true;
		document.getElementById('success-outlined2').checked = false;
		}		
    break;
  case "radicado":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined2b').checked = false;
		document.getElementById('success-outlined2b').checked = true;
		}else{
		document.getElementById('danger-outlined2b').checked = true;
		document.getElementById('success-outlined2b').checked = false;
		}		
    break;
  case "estado":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined5').checked = false;
		document.getElementById('success-outlined5').checked = true;
		}else{
		document.getElementById('danger-outlined5').checked = true;
		document.getElementById('success-outlined5').checked = false;
		}		
    break;
  case "creado":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined7').checked = false;
		document.getElementById('success-outlined7').checked = true;
		}else{
		document.getElementById('danger-outlined7').checked = true;
		document.getElementById('success-outlined7').checked = false;
		}		
    break;
  case "modificado":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined9').checked = false;
		document.getElementById('success-outlined9').checked = true;
		}else{
		document.getElementById('danger-outlined9').checked = true;
		document.getElementById('success-outlined9').checked = false;
		}		
    break;
  case "documental":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined11').checked = false;
		document.getElementById('success-outlined11').checked = true;
		}else{
		document.getElementById('danger-outlined11').checked = true;
		document.getElementById('success-outlined11').checked = false;
		}		
    break;
  case "asunto":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined13').checked = false;
		document.getElementById('success-outlined13').checked = true;
		}else{
		document.getElementById('danger-outlined13').checked = true;
		document.getElementById('success-outlined13').checked = false;
		}		
    break;
  case "comunicacion":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined15').checked = false;
		document.getElementById('success-outlined15').checked = true;
		}else{
		document.getElementById('danger-outlined15').checked = true;
		document.getElementById('success-outlined15').checked = false;
		}		
    break;
  case "fecha":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined17').checked = false;
		document.getElementById('success-outlined17').checked = true;
		}else{
		document.getElementById('danger-outlined17').checked = true;
		document.getElementById('success-outlined17').checked = false;
		}		
    break;
  case "identificacion":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined19').checked = false;
		document.getElementById('success-outlined19').checked = true;
		}else{
		document.getElementById('danger-outlined19').checked = true;
		document.getElementById('success-outlined19').checked = false;
		}		
    break;
  case "empleado":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined21').checked = false;
		document.getElementById('success-outlined21').checked = true;
		}else{
		document.getElementById('danger-outlined21').checked = true;
		document.getElementById('success-outlined21').checked = false;
		}		
    break;
  case "descripcion":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined23').checked = false;
		document.getElementById('success-outlined23').checked = true;
		}else{
		document.getElementById('danger-outlined23').checked = true;
		document.getElementById('success-outlined23').checked = false;
		}		
    break;
  case "anexo":
		if( lr_SQL[i][1] == 0){ 
		document.getElementById('danger-outlined25').checked = false;
		document.getElementById('success-outlined25').checked = true;
		}else{
		document.getElementById('danger-outlined25').checked = true;
		document.getElementById('success-outlined25').checked = false;
		}		
    break;
		}
		}
		});
}

function grabar_pantallas(){	
	  var soc_radio = document.getElementsByName('soc_radio');
	  var corr_radio = document.getElementsByName('corr_radio');
	  var estado_radio = document.getElementsByName('estado_radio');
	  var radicado_radio = document.getElementsByName('radicado_radio');
	  var creado_por_radio = document.getElementsByName('creado_por_radio');
	  var modificado_radio = document.getElementsByName('modificado_radio');
	  var documental_radio = document.getElementsByName('documental_radio');
	  var asunto_radio = document.getElementsByName('asunto_radio');
	  var comunicacion_radio = document.getElementsByName('comunicacion_radio');
	  var fecha_radio = document.getElementsByName('fecha_radio');
	  var identificacion_radio = document.getElementsByName('identificacion_radio');
	  var empleado_radio = document.getElementsByName('empleado_radio');
	  var descripcion_radio = document.getElementsByName('descripcion_radio');
	  var anexo_radio = document.getElementsByName('anexo_radio');
	  if(soc_radio[0].checked == true){ mostrar_sociedad = 0; }else{ mostrar_sociedad = 1; }
	  if(corr_radio[0].checked == true){ mostrar_correspondencia = 0; }else{ mostrar_correspondencia = 1; }
	  if(radicado_radio[0].checked == true){ mostrar_radicado = 0; }else{ mostrar_radicado = 1; }
	  if(estado_radio[0].checked == true){ mostrar_estado = 0; }else{ mostrar_estado = 1; }
	  if(creado_por_radio[0].checked == true){ mostrar_creado = 0; }else{ mostrar_creado = 1; }
	  if(modificado_radio[0].checked == true){ mostrar_modificado = 0; }else{ mostrar_modificado = 1; }
	  if(documental_radio[0].checked == true){ mostrar_documental = 0; }else{ mostrar_documental = 1; }
	  if(asunto_radio[0].checked == true){ mostrar_asunto = 0; }else{ mostrar_asunto = 1; }
	  if(comunicacion_radio[0].checked == true){ mostrar_comunicacion = 0; }else{ mostrar_comunicacion = 1; }
	  if(fecha_radio[0].checked == true){ mostrar_fecha = 0; }else{ mostrar_fecha = 1; }
	  if(identificacion_radio[0].checked == true){ mostrar_identificacion = 0; }else{ mostrar_identificacion = 1; }
	  if(empleado_radio[0].checked == true){ mostrar_empleado = 0; }else{ mostrar_empleado = 1; }
	  if(descripcion_radio[0].checked == true){ mostrar_descripcion = 0; }else{ mostrar_descripcion = 1; }
	  if(anexo_radio[0].checked == true){ mostrar_anexo = 0; }else{ mostrar_anexo = 1; }

		$.post("controller/modelo.php", { consulta: 'pantallas', operacion: 'grabar',
			mostrar_sociedad:mostrar_sociedad,
			mostrar_correspondencia:mostrar_correspondencia,
			mostrar_radicado:mostrar_radicado,
			mostrar_estado:mostrar_estado,
			mostrar_creado:mostrar_creado,
			mostrar_modificado:mostrar_modificado,
			mostrar_documental:mostrar_documental,
			mostrar_asunto:mostrar_asunto,
			mostrar_comunicacion:mostrar_comunicacion,
			mostrar_fecha:mostrar_fecha,
			mostrar_identificacion:mostrar_identificacion,
			mostrar_empleado:mostrar_empleado,
			mostrar_descripcion:mostrar_descripcion,
			mostrar_anexo:mostrar_anexo }, function(data2) {
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>" + data2 + "</div>";
		});
}

$(function(){
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});

//--------------------------------------------CORRESPONDENCIA----------------------------------------//
var sociedad = "";
var activo = 1;

function actualizar_boton(z){
	document.getElementById('btn_soc').innerHTML = z;
	sociedad = z;
}

function validar_activo(y){
//		alert(activo);
if(y === "Activo"){
	activo = 1;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
}else{
	activo = 2;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
}
}

$(function(){ // SI PRESIONAN ENTER
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#nuevo").click(function(){
        document.getElementById('lr_control').value = "insertar";
		document.getElementById('btn_soc').innerHTML = "Sociedad";
		sociedad = "";
		document.getElementById('id_correspondencia').value = "";
		document.getElementById('mensaje').innerHTML = "";
		document.getElementById('tipo_correspondencia').value = "";
		document.getElementById('success-outlined').checked = false;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
});
});

function grabar_correspondencia(){
	  if( document.getElementById('lr_control').value == "actualizar" ){ //ACTUALZAR SOCIEDAD
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}else{
	    id_correspondencia = document.getElementById('id_correspondencia').value;
	    tipo_correspondencia = document.getElementById('tipo_correspondencia').value;
		$.post("../eurodocweb1d/TiposCorrespondencia/controlador.php", {consulta: 'correspondencia', operacion: 'actualizar', id_correspondencia: id_correspondencia,tipo_correspondencia:tipo_correspondencia,sociedad:sociedad,activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/TiposCorrespondencia/controlador.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		resultados_correspondencia();
		});	
		}
	  }else{ //INSERTAR NUEVA SOCIEDAD
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}else{
	    id_correspondencia = document.getElementById('id_correspondencia').value;
	    tipo_correspondencia = document.getElementById('tipo_correspondencia').value;
		$.post("controller/controlador_correspondencia.php", { consulta: 'correspondencia', operacion: 'insertar', id_correspondencia: id_correspondencia,tipo_correspondencia:tipo_correspondencia,sociedad:sociedad,activo:activo}, function(data2) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data2 + "</div>";
		});
		$.post("controller/controlador_correspondencia.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data2) {
		resultados_correspondencia();
		});
		}
	  }
}
	  
function actualizar(x,y,t,u){
//		alert(activo);
	  document.getElementById('mensaje').innerHTML = "";
      document.getElementById('lr_control').value = "actualizar";
		for( var i = 0; i < lr_SQL.length; i++ ) {
		if( lr_SQL[i][0] === x ) {
        console.log(lr_SQL[i]);
		document.getElementById('id_correspondencia').value = lr_SQL[i][0];
		document.getElementById('tipo_correspondencia').value = lr_SQL[i][1];
		if(lr_SQL[i][2] !== ""){
		document.getElementById('btn_soc').innerHTML = lr_SQL[i][2];
		sociedad = lr_SQL[i][2];
		}else{
		document.getElementById('btn_soc').innerHTML = "Sociedad";			
		}
		if(lr_SQL[i][3] == 2){ 
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		}else{ 
		document.getElementById('success-outlined').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		}
        break;
		}
		}
}

function borrar(x){
		$.post("controller/controlador_correspondencia.php", {consulta: 'correspondencia', operacion: 'borrar', id_correspondencia: x}, function(data) {
		console.log(data);
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("controller/controlador_correspondencia.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		});
		resultados_correspondencia();
}

function resultados_correspondencia(){
		$.post("controller/modelo.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		lr_resultados = "<div class='row'><BR><P>";
		for(i = 0;i < lr_SQL.length;i++){
		if(lr_SQL[i][3] == 2){ lr_icono = "<i class='fas fa-toggle-off'></i> Inactivo"}
		else{ lr_icono = "<i class='fas fa-toggle-on'></i> Activo" }
		lr_resultados = lr_resultados + "<div class='col-sm-1'>" + lr_SQL[i][0] + "</div><div class='col-sm-3'>" + lr_SQL[i][1] + "</div>"
		+ "<div class='col-sm-2'>" + lr_SQL[i][2] + "</div><div class='col-sm-2'>" + lr_icono + "</div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-success' id='Editar' onclick='actualizar(\"" + lr_SQL[i][0] + "\",\"" + lr_SQL[i][1] + "\",\"" + lr_SQL[i][2] + "\",\"" + lr_SQL[i][3] + "\")'>"
		+ "<i class='fas fa-edit'></i> &nbsp;Editar</button></div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-danger' id='Borrar' onclick='borrar(\"" + lr_SQL[i][0] + "\")'>"
		+ "<i class='fas fa-trash-alt'></i> &nbsp;Borrar</button></div>";
		}
		lr_resultados = lr_resultados + "</div>";
		document.getElementById('resultados').innerHTML = lr_resultados;
});
}

//--------------------------------------------DOCUMENTALES----------------------------------------//

var sociedad = "";
var correspondencia = "";
var activo = 1;

function actualizar_boton(z){
	document.getElementById('btn_soc').innerHTML = z;
	sociedad = z;
}

function actualizar_correspondencia(r){
	document.getElementById('btn_corresp').innerHTML = r;
	correspondencia = r;
}

function validar_activo(y){
//		alert(activo);
if(y === "Activo"){
	activo = 1;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
}else{
	activo = 2;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
}
}

$(function(){ // SI PRESIONAN ENTER
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#nuevo").click(function(){
        document.getElementById('lr_control').value = "insertar";
		document.getElementById('btn_soc').innerHTML = "Sociedad";
		sociedad = "";
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";
		correspondencia = "";
		document.getElementById('id_documental').value = "";
		document.getElementById('mensaje').innerHTML = "";
		document.getElementById('tipo_documental').value = "";
		document.getElementById('success-outlined').checked = false;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
});
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#continuar").click(function(){
//	  alert(document.getElementById('lr_control').value);
	  if( document.getElementById('lr_control').value == "actualizar" ){ //ACTUALZAR SOCIEDAD
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(sociedad !== "" && correspondencia !== ""){
	    id_documental = document.getElementById('id_documental').value;
	    tipo_documental = document.getElementById('tipo_documental').value;
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", {consulta: 'documental', operacion: 'actualizar', sociedad: sociedad,correspondencia: correspondencia,id_documental: id_documental,tipo_documental:tipo_documental,activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", { consulta: 'documental', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		resultados_documentales();
		});	
		}
	  }else{ //INSERTAR NUEVA SOCIEDAD
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(sociedad !== "" && correspondencia !== ""){
	    id_documental = document.getElementById('id_documental').value;
	    tipo_documental = document.getElementById('tipo_documental').value;
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", { consulta: 'documental', operacion: 'insertar', sociedad: sociedad,correspondencia: correspondencia,id_documental: id_documental,tipo_documental:tipo_documental,activo:activo}, function(data2) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data2 + "</div>";
		});
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data2) {
		resultados_documentales();
		});
		}
	  }
});
});
	  
function actualizar(x,y,t,u,s){
//		alert(activo);
	  document.getElementById('mensaje').innerHTML = "";
      document.getElementById('lr_control').value = "actualizar";
		for( var i = 0; i < lr_SQL.length; i++ ) {
		if( lr_SQL[i][2] === t ) {
        console.log(lr_SQL[i]);
		document.getElementById('id_documental').value = lr_SQL[i][2];
		document.getElementById('tipo_documental').value = lr_SQL[i][3];
		if(lr_SQL[i][0] !== ""){
		document.getElementById('btn_soc').innerHTML = lr_SQL[i][0];
		sociedad = lr_SQL[i][0];
		}else{
		document.getElementById('btn_soc').innerHTML = "Sociedad";			
		}
		if(lr_SQL[i][1] !== ""){
		document.getElementById('btn_corresp').innerHTML = lr_SQL[i][1];
		correspondencia = lr_SQL[i][1];
		}else{
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";			
		}
		if(lr_SQL[i][4] == 2){ 
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		}else{ 
		document.getElementById('success-outlined').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		}
        break;
		}
		}
}

function borrar(x){
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", {consulta: 'documental', operacion: 'borrar', id_documental: x}, function(data) {
		console.log(data);
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/TiposDocumentales/controlador.php", { consulta: 'documental', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		});
		resultados_documentales();
}

function resultados_documentales(){
$.post("controller/modelo.php", { consulta: 'documental', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		lr_resultados = "<div class='row'><BR><P>";
		for(i = 0;i < lr_SQL.length;i++){
		if(lr_SQL[i][4] == 2){ lr_icono = "<i class='fas fa-toggle-off'></i> Inactivo"}
		else{ lr_icono = "<i class='fas fa-toggle-on'></i> Activo" }
		lr_resultados = lr_resultados + "<div class='col-sm-2'>" + lr_SQL[i][0] + "</div><div class='col-sm-2'>" + lr_SQL[i][1] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][2] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][3] + "</div><div class='col-sm-2'>" + lr_icono + "</div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-success' id='Editar' onclick='actualizar(\"" + lr_SQL[i][0] + "\",\"" + lr_SQL[i][1] + "\",\"" + lr_SQL[i][2] + "\",\"" + lr_SQL[i][3] + "\",\"" + lr_SQL[i][4] + "\")'>"
		+ "<i class='fas fa-edit'></i> &nbsp;Editar</button></div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-danger' id='Borrar' onclick='borrar(\"" + lr_SQL[i][2] + "\")'>"
		+ "<i class='fas fa-trash-alt'></i> &nbsp;Borrar</button></div>";
		}
		lr_resultados = lr_resultados + "</div>";
		document.getElementById('resultados_documentales').innerHTML = lr_resultados;
});	
}

//--------------------------------------------ASUNTOS----------------------------------------//
var sociedad = "";
var correspondencia = "";
var documental = "";
var activo = 1;

function actualizar_boton(z){
	document.getElementById('btn_soc').innerHTML = z;
	sociedad = z;
}

function actualizar_correspondencia(r){
	document.getElementById('btn_corresp').innerHTML = r;
	correspondencia = r;
}

function actualizar_documental(t){
	document.getElementById('btn_docu').innerHTML = t;
	documental = t;
}

function validar_activo(y){
//		alert(activo);
if(y === "Activo"){
	activo = 1;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
}else{
	activo = 2;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
}
}
/*
function leer_sociedades(){
	$.post("../eurodocweb1d/TiposDocumentales/controlador.php", { consulta: 'sociedades', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		for(i=0;i < lr_SQL.length;i++){
			if(lr_SQL[i][1] == 1 ){
		var createA = document.createElement('a');
		createA.setAttribute('class', "dropdown-item");
		createA.setAttribute('id', "soc_"+i);
		createA.setAttribute("onclick","actualizar_boton('" + lr_SQL[i][0] + "')");
		var createAText = document.createTextNode(lr_SQL[i][0]);
		createA.appendChild(createAText);
		document.getElementById('btn_sociedad').appendChild(createA);
			}
		}
	});
}

function leer_correspondencias(){
	$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'correspondencia', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL.length);
		for(i=0;i < lr_SQL.length;i++){
			if(lr_SQL[i][3] == 1 ){
		var createB = document.createElement('a');
		createB.setAttribute('class', "dropdown-item");
		createB.setAttribute('id', "corr_"+i);
		createB.setAttribute("onclick","actualizar_correspondencia('" + lr_SQL[i][1] + "')");
		var createBText = document.createTextNode(lr_SQL[i][1]);
		createB.appendChild(createBText);
		document.getElementById('btn_correspondencia').appendChild(createB);
			}
		}
	});
}
function leer_documentales(){
	$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'documental', operacion: 'leer' }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL.length);
		for(i=0;i < lr_SQL.length;i++){
			if(lr_SQL[i][4] == 1 ){
		var createB = document.createElement('a');
		createB.setAttribute('class', "dropdown-item");
		createB.setAttribute('id', "ast_"+i);
		createB.setAttribute("onclick","actualizar_documental('" + lr_SQL[i][3] + "')");
		var createBText = document.createTextNode(lr_SQL[i][3]);
		createB.appendChild(createBText);
		document.getElementById('btn_documental').appendChild(createB);
			}
		}
	});
}
*/

$(function(){ // SI PRESIONAN ENTER
  $('.container').keypress(function(e){
    if(e.which == 13) {
	  id_sociedad=$('#id_sociedad').val();
	  texto_sociedad=$('#texto_sociedad').val();
    $("#mensaje").load("../eurodocweb1d/sociedades/crud/insert.php", {id_sociedad:id_sociedad,texto_sociedad:texto_sociedad} );
    $("#resultados").load("../eurodocweb1d/sociedades/crud/leer.php");	
	  id_sociedad="";
	  texto_sociedad="";
	  document.getElementById('id_sociedad').value = "";
	  document.getElementById('texto_sociedad').value = "";
    }
  })
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#nuevo").click(function(){
        document.getElementById('lr_control').value = "insertar";
		document.getElementById('btn_soc').innerHTML = "Sociedad";
		sociedad = "";
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";
		correspondencia = "";
		document.getElementById('btn_docu').innerHTML = "Tipo documental";
		documental = "";
		document.getElementById('id_asunto').value = "";
		document.getElementById('mensaje').innerHTML = "";
		document.getElementById('texto_asunto').value = "";
		document.getElementById('success-outlined').checked = false;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
});
});

$(document).ready(function(){ //CLICK EN GUARDAR
  $("#continuar").click(function(){
//	  alert(document.getElementById('lr_control').value);
	  if( document.getElementById('lr_control').value == "actualizar" ){ //ACTUALZAR SOCIEDAD
		if(sociedad === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(documental === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo documental</div>";
		}
		if(sociedad !== "" && correspondencia !== "" && documental !== ""){
	    id_asunto = document.getElementById('id_asunto').value;
	    texto_asunto = document.getElementById('texto_asunto').value;
		$.post("../eurodocweb1d/Asunto/controlador.php", {consulta: 'asunto', operacion: 'actualizar', sociedad: sociedad,correspondencia: correspondencia,documental: documental,id_asunto:id_asunto,texto_asunto:texto_asunto,activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'asunto', operacion: 'leer' }, function(data2) {
		refrescar_resultados();
		});	
		}
	  }else{ //INSERTAR NUEVA SOCIEDAD
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(documental == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo documental</div>";
		}
		if(sociedad !== "" && correspondencia !== "" && documental !== ""){
	    id_asunto = document.getElementById('id_asunto').value;
	    texto_asunto = document.getElementById('texto_asunto').value;
		$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'asunto', operacion: 'insertar', sociedad: sociedad,correspondencia: correspondencia,documental: documental,id_asunto:id_asunto,texto_asunto:texto_asunto,activo:activo}, function(data2) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data2 + "</div>";
		});
		$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'asunto', operacion: 'leer' }, function(data2) {
		refrescar_resultados();
		});
		}
	  }
});
});
	  
function actualizar(x,y,t,u,s,c){
//		alert(activo);
	  document.getElementById('mensaje').innerHTML = "";
      document.getElementById('lr_control').value = "actualizar";
		for( var i = 0; i < lr_SQL.length; i++ ) {
		if( lr_SQL[i][3] === u ) {
        console.log(lr_SQL[i]);
		document.getElementById('id_asunto').value = lr_SQL[i][3];
		document.getElementById('texto_asunto').value = lr_SQL[i][4];
		if(lr_SQL[i][0] !== ""){
		document.getElementById('btn_soc').innerHTML = lr_SQL[i][0];
		sociedad = lr_SQL[i][0];
		}else{
		document.getElementById('btn_soc').innerHTML = "Sociedad";			
		}
		if(lr_SQL[i][1] !== ""){
		document.getElementById('btn_corresp').innerHTML = lr_SQL[i][1];
		correspondencia = lr_SQL[i][1];
		}else{
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";			
		}
		if(lr_SQL[i][2] !== ""){
		document.getElementById('btn_docu').innerHTML = lr_SQL[i][2];
		documental = lr_SQL[i][2];
		}else{
		document.getElementById('btn_docu').innerHTML = "Tipo documental";			
		}
		if(lr_SQL[i][5] == 2){ 
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		}else{ 
		document.getElementById('success-outlined').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		}
        break;
		}
		}
}

function borrar(x){
		$.post("../eurodocweb1d/Asunto/controlador.php", {consulta: 'documental', operacion: 'borrar', id_documental: x}, function(data) {
		console.log(data);
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'documental', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		});
		refrescar_resultados();
}

function resultados_asuntos(){
$.post("controller/modelo.php", { consulta: 'asuntos', operacion: 'leer' }, function(data) {	
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		lr_resultados = "<div class='row'><BR><P>";
		for(i = 0;i < lr_SQL.length;i++){
		if(lr_SQL[i][5] == 2){ lr_icono = "<i class='fas fa-toggle-off'></i> Inactivo"}
		else{ lr_icono = "<i class='fas fa-toggle-on'></i> Activo" }
		lr_resultados = lr_resultados + "<div class='col-sm-1'>" + lr_SQL[i][0] + "</div><div class='col-sm-2'>" + lr_SQL[i][1] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][2] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][3] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][4] + "</div>"
		+ "<div class='col-sm-2'>" + lr_icono + "</div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-success' id='Editar' onclick='actualizar(\"" + lr_SQL[i][0] + "\",\"" + lr_SQL[i][1] + "\",\"" + lr_SQL[i][2] + "\",\"" + lr_SQL[i][3] + "\",\"" + lr_SQL[i][4] + "\",\"" + lr_SQL[i][5] + "\")'>"
		+ "<i class='fas fa-edit'></i> &nbsp;Editar</button></div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-danger' id='Borrar' onclick='borrar(\"" + lr_SQL[i][2] + "\")'>"
		+ "<i class='fas fa-trash-alt'></i> &nbsp;Borrar</button></div>";
		}
		lr_resultados = lr_resultados + "</div>";
		document.getElementById('resultados').innerHTML = lr_resultados;
});	
}

//--------------------------------------------RUTAS-----------------------------------//

function grabar_rutas(){
	  if( document.getElementById('lr_control').value == "actualizar" ){ //ACTUALIZAR RUTAS
		if(sociedad === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(documental === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo documental</div>";
		}
		if(sociedad !== "" && correspondencia !== "" && documental !== ""){		
		$.post("controller/modelo.php", {consulta: 'rutas', operacion: 'actualizar', sociedad: sociedad,correspondencia: correspondencia,documental: documental,id_asunto:id_asunto,texto_asunto:texto_asunto,activo:activo}, function(data) {
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("controller/modelo.php", { consulta: 'rutas', operacion: 'leer' }, function(data2) {
		resultados_rutas();
		});	
		}
	  }else{ //GRABAR RUTAS
		if(sociedad == ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar una sociedad</div>";
		}
		if(correspondencia === ""){
			document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#exclamation-triangle-fill'/></svg>Debe seleccionar un tipo de correspondencia</div>";
		}
		if(sociedad !== "" && correspondencia !== ""){
	    directorio_archivos = document.getElementById('directorio_archivos').value;
		crear_directorio(directorio_archivos);
		}
	  }
}
	  
function actualizar(x,y,t,u,s,c){
//		alert(activo);
	  document.getElementById('mensaje').innerHTML = "";
      document.getElementById('lr_control').value = "actualizar";
		for( var i = 0; i < lr_SQL.length; i++ ) {
		if( lr_SQL[i][3] === u ) {
        console.log(lr_SQL[i]);
		document.getElementById('id_asunto').value = lr_SQL[i][3];
		document.getElementById('texto_asunto').value = lr_SQL[i][4];
		if(lr_SQL[i][0] !== ""){
		document.getElementById('btn_soc').innerHTML = lr_SQL[i][0];
		sociedad = lr_SQL[i][0];
		}else{
		document.getElementById('btn_soc').innerHTML = "Sociedad";			
		}
		if(lr_SQL[i][1] !== ""){
		document.getElementById('btn_corresp').innerHTML = lr_SQL[i][1];
		correspondencia = lr_SQL[i][1];
		}else{
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";			
		}
		if(lr_SQL[i][2] !== ""){
		document.getElementById('btn_docu').innerHTML = lr_SQL[i][2];
		documental = lr_SQL[i][2];
		}else{
		document.getElementById('btn_docu').innerHTML = "Tipo documental";			
		}
		if(lr_SQL[i][5] == 2){ 
		document.getElementById('danger-outlined').checked = true;
		document.getElementById('success-outlined').checked = false;
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-danger");
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		}else{ 
		document.getElementById('success-outlined').checked = true;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		}
        break;
		}
		}
}

function borrar(x){
		$.post("../eurodocweb1d/Asunto/controlador.php", {consulta: 'documental', operacion: 'borrar', id_documental: x}, function(data) {
		console.log(data);
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'><svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>" + data + "</div>";
		});
		$.post("../eurodocweb1d/Asunto/controlador.php", { consulta: 'documental', operacion: 'leer' }, function(data2) {
        returnData = data2;
		console.log("debug1");
		console.log(data2);
		lr_SQL = JSON.parse(data2);
		console.log("debug2");
		console.log(lr_SQL);
		});
		refrescar_resultados();
}

function resultados_rutas(){
$.post("controller/modelo.php", { consulta: 'rutas', operacion: 'leer' }, function(data) {	
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		lr_resultados = "<div class='row'><BR><P>";
		for(i = 0;i < lr_SQL.length;i++){
		if(lr_SQL[i][5] == 2){ lr_icono = "<i class='fas fa-toggle-off'></i> Inactivo"}
		else{ lr_icono = "<i class='fas fa-toggle-on'></i> Activo" }
		lr_resultados = lr_resultados + "<div class='col-sm-1'>" + lr_SQL[i][0] + "</div><div class='col-sm-2'>" + lr_SQL[i][1] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][2] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][3] + "</div>"
		+ "<div class='col-sm-1'>" + lr_SQL[i][4] + "</div>"
		+ "<div class='col-sm-2'>" + lr_icono + "</div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-success' id='Editar' onclick='actualizar(\"" + lr_SQL[i][0] + "\",\"" + lr_SQL[i][1] + "\",\"" + lr_SQL[i][2] + "\",\"" + lr_SQL[i][3] + "\",\"" + lr_SQL[i][4] + "\",\"" + lr_SQL[i][5] + "\")'>"
		+ "<i class='fas fa-edit'></i> &nbsp;Editar</button></div>"
		+ "<div class='col-sm-2'><button class='w-100 btn btn-danger' id='Borrar' onclick='borrar(\"" + lr_SQL[i][2] + "\")'>"
		+ "<i class='fas fa-trash-alt'></i> &nbsp;Borrar</button></div>";
		}
		lr_resultados = lr_resultados + "</div>";
		document.getElementById('resultados_rutas').innerHTML = lr_resultados;
});	
}

function nueva_ruta(){
		sociedad = "";
		correspondencia = "";
		document.getElementById('btn_soc').innerHTML = "Sociedad";
		document.getElementById('btn_corresp').innerHTML = "Correspondencia";
		document.getElementById('id_ruta').value = "";
		document.getElementById('directorio_archivos').value = "";
		document.getElementById('success-outlined').checked = false;
		document.getElementById('danger-outlined').checked = false;
		document.getElementById('lbl_activo').setAttribute('class',"btn btn-outline-success");
		document.getElementById('lbl_inactivo').setAttribute('class',"btn btn-outline-danger");
		
}

	  function crear_directorio(ls_folder){
$.post("controller/crear_dir.php", { consulta: 'FS', operacion: 'crear', carpeta: ls_folder}, function(data) {
		if(data === "1"){
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger small fade show p-2' role='alert'>" + 
		"<svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Danger:'><use xlink:href='#check-circle-fill'/></svg>" + 
		"Error, la carpeta " + ls_folder + " ya existe</div>";
		}
		if(data === "2"){
		document.getElementById('mensaje').innerHTML = "<div class='alert alert-success small fade show p-2' role='alert'>" + 
		"<svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='success:'><use xlink:href='#check-circle-fill'/></svg>" + 
		"Directorio " + ls_folder + " creado correctamente</div>";
	    id_ruta = document.getElementById('id_ruta').value;
		year = document.getElementById('year').value;
		$.post("controller/modelo.php", { consulta: 'rutas', operacion: 'insertar', year: year,sociedad: sociedad,correspondencia: correspondencia,id_ruta:id_ruta,directorio_archivos:ls_folder,activo:activo}, function(data2) {
		sociedad = "";
		correspondencia = "";
		resultados_rutas();
		});
		}
     });
	  }

function leer_directorios(soc,corresp){
		var d = new Date();
		year = d.getFullYear();
//	$.post("controller/modelo.php", { consulta: 'directorios', operacion: 'leer', year: year,sociedad: sociedad,correspondencia: correspondencia }, function(data) {
	$.post("controller/modelo.php", { consulta: 'directorios', operacion: 'leer', year: year, sociedad: soc, correspondencia: corresp }, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		for(var i = 0; i < lr_SQL.length; i++){
			if(lr_SQL[i][1] == 1 ){
		var createA = document.createElement('a');
		createA.setAttribute('class', "dropdown-item");
		createA.setAttribute('id', "ruta_"+i);
		createA.setAttribute("onclick","actualizar_rutas('" + lr_SQL[i][0] + "')");
		var createAText = document.createTextNode(lr_SQL[i][0]);
		createA.appendChild(createAText);
		document.getElementById('dd_anexo').appendChild(createA);
			}
		}
	});
}

function llenar_tabla_anexos(){
	var Numero_radicado = document.getElementById("Numero_radicado").value;	
		lr_anexos_tabla = "<tr><th></th><th>Archivo</th></tr>";
	$.post("controller/modelo.php", { consulta: 'anexos', operacion: 'leer', radicado: Numero_radicado}, function(data) {
        returnData = data;
		console.log(data);
		lr_SQL = JSON.parse(data);
		console.log(lr_SQL);
		for(i=0;i < lr_SQL.length;i++){
		nombre_archivo = lr_SQL[i].substring(lr_SQL[i].lastIndexOf("/")+1,lr_SQL[i].length);
		lr_anexos_tabla = lr_anexos_tabla + "<tr><td><input class='form-check-input' type='radio' name='td_anexos1' id='id2_" + i +
		"' value='" + lr_SQL[i] + "'></td><td>" + nombre_archivo + "<input type='hidden' value='" + lr_SQL[i] + "' id='hid2_" + i + "'/></td></tr>";
		}
		document.getElementById("tabla_anexos").innerHTML = lr_anexos_tabla;
		});	
}

function mostrar_iframe_anexo(){
            var ele = document.getElementsByName('td_anexos1');
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
					document.getElementById("ifr1").style.display = "block";
					document.getElementById("ifr1").src = ele[i].value;
            }
        }
}