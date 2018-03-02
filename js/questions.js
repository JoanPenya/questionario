//Funcionamiento del questionario//
var url="xml/preguntas.xml";
var formElement=null;
var respuestaEscrita=null;
var respuestaSelect=null;
var respuestaMultiple=null;
var respuestaCheckbox= [];
var respuestaRadio= [];
var nota=0;

//====================================================//
//Después de cargar la página (onload) se define los eventos sobre los
//elemtos entre otras acciones.
window.onload = function(){

	//Función de correción
	formElement=document.getElementById('myForm');
	formElement.onsubmit=function(){
		iniciar();
		if (comprobar()){
			corregirEscrito();
			corregirSelect();
			corregirMultiple();
			corregirCheckbox();
			corregirRadio();
			presentarNota();
		}
		return false;
	} 

	//FUNCIÓN DE LECTOR XML
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			gestionarXml(this);
		}
	}
	xhttp.open("GET", url, true);
	xhttp.send();
}

//===============================================================
//Se ejecuta el fichero mencionado XML
//xmlDOC es el documento leido XML.
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc

	//ESCRITO
	//Recuperamos el título y la respuesta correcta de Input, 
	//Pregunta 1
	var preg1=xmlDoc.getElementsByTagName("title")[0].innerHTML;
	ponerDatosInputHtml1(preg1);
	respuesta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

	//Pregunta 2
	var preg2=xmlDoc.getElementsByTagName("title")[1].innerHTML;
	ponerDatosInputHtml2(preg2);
	respuesta=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

	//SELECT
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 3
	var preg3=xmlDoc.getElementsByTagName("title")[2].innerHTML;
	var opcionesSelect = [];
	var nopt = xmlDoc.getElementById("profe003").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesSelect[i] = xmlDoc.getElementById("profe003").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosSelectHtml1(preg3,opcionesSelect);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

	//Pregunta 4
	var preg4=xmlDoc.getElementsByTagName("title")[3].innerHTML;
	var opcionesSelect = [];
	var nopt = xmlDoc.getElementById("profe004").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesSelect[i] = xmlDoc.getElementById("profe004").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosSelectHtml2(preg4,opcionesSelect);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

	//MULTI
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 5
	var preg5=xmlDoc.getElementsByTagName("title")[4].innerHTML;
	var opcionesMultiple = [];
	var nopt = xmlDoc.getElementById("profe005").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesMultiple[i] = xmlDoc.getElementById("profe005").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosMultipleHtml1(preg5,opcionesMultiple);
	respuestaMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
	respuestaMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
	
	//Pregunta 6
	var preg6=xmlDoc.getElementsByTagName("title")[5].innerHTML;
	var opcionesMultiple = [];
	var nopt = xmlDoc.getElementById("profe006").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesMultiple[i] = xmlDoc.getElementById("profe006").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosMultipleHtml2(preg6,opcionesMultiple);
	respuestaMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

	//CheckBox
	//Recuperamos el título y las opciones, guardamos las respuesta correcta.
	//Pregunta 7
	var preg7 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
	var opcionesCheckbox = [];
	var nopt = xmlDoc.getElementById("profe007").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++){
		opcionesCheckbox[i]=xmlDoc.getElementById("profe007").getElementsByTagName('option')[i].innerHTML;
	}	
	ponerDatosCheckboxHtml1(preg7,opcionesCheckbox);
	var nres = xmlDoc.getElementById("profe007").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaCheckbox[i]=xmlDoc.getElementById("profe007").getElementsByTagName("answer")[i].innerHTML;
	}

	//Pregunta 8
	var preg8 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
	var opcionesCheckbox = [];
	var nopt = xmlDoc.getElementById("profe008").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++){
		opcionesCheckbox[i]=xmlDoc.getElementById("profe008").getElementsByTagName('option')[i].innerHTML;
	}	
	ponerDatosCheckboxHtml2(preg8,opcionesCheckbox);
	var nres = xmlDoc.getElementById("profe008").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaCheckbox[i]=xmlDoc.getElementById("profe008").getElementsByTagName("answer")[i].innerHTML;
	}

	//RADIO
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 9
	var preg9 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
	var opcionesRadio = [];
	var nopt = xmlDoc.getElementById("profe009").getElementsByTagName('option').length;
	for(i = 0; i < nopt; i++){
		opcionesRadio[i]=xmlDoc.getElementById("profe009").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosRadioHtml1(preg9,opcionesRadio);
	var nres = xmlDoc.getElementById("profe009").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaRadio[i]=xmlDoc.getElementById("profe009").getElementsByTagName('answer')[i].innerHTML;
	}

	//Pregunta 10
	var preg10 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
	var opcionesRadio = [];
	var nopt = xmlDoc.getElementById("profe010").getElementsByTagName('option').length;
	for(i = 0; i < nopt; i++){
		opcionesRadio[i]=xmlDoc.getElementById("profe010").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosRadioHtml2(preg10,opcionesRadio);
	var nres = xmlDoc.getElementById("profe010").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaRadio[i]=xmlDoc.getElementById("profe010").getElementsByTagName('answer')[i].innerHTML;
	}

//-------------------------------------------------------------//
	//Programas que generan las preguntas de XML en HTML. 

	//Genera las preguntas escritas
	function ponerDatosInputHtml1(t){
		document.getElementById("preg1").innerHTML = t;
	}

	function ponerDatosInputHtml2(t){
		document.getElementById("preg2").innerHTML = t;
	}

	//Para generar preguntas de tipo select.
	function ponerDatosSelectHtml1(t,opt){
		document.getElementById("preg3").innerHTML=t;
		var select = document.getElementsByTagName("select")[0];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value=i+1;
			select.options.add(option);
		}
	}

	function ponerDatosSelectHtml2(t,opt){
		document.getElementById("preg4").innerHTML=t;
		var select = document.getElementsByTagName("select")[1];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value=i+1;
			select.options.add(option);
		}
	}

	//Para generar preguntas MULTI
	function ponerDatosMultipleHtml1(t, opt){
		document.getElementById("preg5").innerHTML=t;
		var select = document.getElementsByTagName("select")[2];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value=i+1;
			select.options.add(option);
		}
	}

	function ponerDatosMultipleHtml2(t, opt){
		document.getElementById("preg6").innerHTML=t;
		var select = document.getElementsByTagName("select")[3];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value=i+1;
			select.options.add(option);
		}
	} 

	//Para generar preguntas de CHECKBOX
	function ponerDatosCheckboxHtml1(t,opt){
		var checkboxContainer=document.getElementById('checkboxDiv1');
		document.getElementById("preg7").innerHTML = t;
		for (i = 0; i < opt.length; i++) {
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			input.type="checkbox";
			checkboxContainer.appendChild(input);
			checkboxContainer.appendChild(label);
			checkboxContainer.appendChild(document.createElement("br"));
		}
	}

	function ponerDatosCheckboxHtml2(t,opt){
		var checkboxContainer=document.getElementById('checkboxDiv2');
		document.getElementById("preg8").innerHTML = t;
		for (i = 0; i < opt.length; i++) {
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			input.type="checkbox";
			checkboxContainer.appendChild(input);
			checkboxContainer.appendChild(label);
			checkboxContainer.appendChild(document.createElement("br"));
		}	
	} 

	//Para generar preguntas de tipo RADIO

	function ponerDatosRadioHtml1(t,opt){
		var radioContainer=document.getElementById('radiodiv1');
		document.getElementById("preg9").innerHTML = t;
		var radioAsignado;
		for(i = 0; i < opt.length; i++){
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion1_" + i);
			input.id ="opcion1_" + i;
			input.type="radio";
			input.name=radioAsignado;
			input.value=i;
			input.setAttribute("onclick", "uncheckRadio(this)");
			radioContainer.appendChild(input);
			radioContainer.appendChild(label);
			radioContainer.appendChild(document.createElement("br"));
		}
	}

	function ponerDatosRadioHtml2(t,opt){
		var radioContainer=document.getElementById('radiodiv2');
		document.getElementById("preg10").innerHTML = t;
		var radioAsignado;
		for(i = 0; i < opt.length; i++){
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion2_" + i);
			input.id ="opcion2_" + i;
			input.type="radio";
			input.name=radioAsignado;
			input.value=i;
			input.setAttribute("onclick", "uncheckRadio(this)");
			radioContainer.appendChild(input);
			radioContainer.appendChild(label);
			radioContainer.appendChild(document.createElement("br"));
		}
	}
	//================================================================================================//
}	