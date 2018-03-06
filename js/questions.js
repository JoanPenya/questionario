//Funcionamiento del questionario//
var url="xml/preguntas.xml";
var formElement=null;
var respuestaEscrita1=null;
var respuestaEscrita2=null;
var respuestaSelect1=null;
var respuestaSelect2=null;
var respuestaMultiple1= [];
var respuestaMultiple2= [];
var respuestaCheckbox1= [];
var respuestaCheckbox2= [];
var respuestaRadio1= [];
var respuestaRadio2= [];
var nota=0;

//====================================================//
//Después de cargar la página (onload) se define los eventos sobre los
//elemtos entre otras acciones.
window.onload = function(){

	//Función de correción
	formElement=document.getElementById('myForm');


	formElement.onsubmit = function (){
		iniciar();
		if (comprobar()){
			corregirEscrito1();
			corregirEscrito2();
			corregirSelect1();
			corregirSelect2();
			corregirMultiple1();
			corregirMultiple2();
			corregirCheckbox1();
			corregirCheckbox2();
			corregirRadio1();
			corregirRadio2();
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
	var tituloEscrito1=xmlDoc.getElementsByTagName("title")[0].innerHTML;
	ponerDatosInputHtml1(tituloEscrito1);
	respuestaEscrita1=xmlDoc.getElementsByTagName("answer")[0].innerHTML;

	//Pregunta 2
	var tituloEscrito2=xmlDoc.getElementsByTagName("title")[1].innerHTML;
	ponerDatosInputHtml2(tituloEscrito2);
	respuestaEscrita2=xmlDoc.getElementsByTagName("answer")[1].innerHTML;

	//SELECT
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 3
	var tituloSelect1=xmlDoc.getElementsByTagName("title")[2].innerHTML;
	var opcionesSelect1 = [];
	var nopt = xmlDoc.getElementById("profe003").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesSelect1[i] = xmlDoc.getElementById("profe003").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosSelectHtml1(tituloSelect1,opcionesSelect1);
	respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);

	//Pregunta 4
	var tituloSelect2=xmlDoc.getElementsByTagName("title")[3].innerHTML;
	var opcionesSelect2 = [];
	var nopt = xmlDoc.getElementById("profe004").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesSelect2[i] = xmlDoc.getElementById("profe004").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosSelectHtml2(tituloSelect2,opcionesSelect2);
	respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);

	//MULTI
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 5
	var tituloMultiple1=xmlDoc.getElementsByTagName("title")[4].innerHTML;
	var opcionesMultiple1 = [];
	var nopt = xmlDoc.getElementById("profe005").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesMultiple1[i] = xmlDoc.getElementById("profe005").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosMultipleHtml1(tituloMultiple1, opcionesMultiple1);
	var nres = xmlDoc.getElementById("profe005").getElementsByTagName('answer').length;
	for ( i = 0; i < nres; i++){
		respuestaMultiple1[i] = xmlDoc.getElementById("profe005").getElementsByTagName("answer")[i].innerHTML;
	}
	
	//Pregunta 6
	var tituloMultiple2=xmlDoc.getElementsByTagName("title")[5].innerHTML;
	var opcionesMultiple2 = [];
	var nopt = xmlDoc.getElementById("profe006").getElementsByTagName('option').length;
		for ( i = 0; i < nopt; i++){
			opcionesMultiple2[i] = xmlDoc.getElementById("profe006").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosMultipleHtml2(tituloMultiple2, opcionesMultiple2);
	var nres = xmlDoc.getElementById("profe006").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++) {
		respuestaMultiple2[i] = xmlDoc.getElementById("profe006").getElementsByTagName("answer")[i].innerHTML;
	}

	//CheckBox
	//Recuperamos el título y las opciones, guardamos las respuesta correcta.
	//Pregunta 7
	var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
	var opcionesCheckbox1 = [];
	var nopt = xmlDoc.getElementById("profe007").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++){
		opcionesCheckbox1[i]=xmlDoc.getElementById("profe007").getElementsByTagName('option')[i].innerHTML;
	}	
	ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox1);
	var nres = xmlDoc.getElementById("profe007").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaCheckbox1[i]=xmlDoc.getElementById("profe007").getElementsByTagName("answer")[i].innerHTML;
	}

	//Pregunta 8
	var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
	var opcionesCheckbox2 = [];
	var nopt = xmlDoc.getElementById("profe008").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++){
		opcionesCheckbox2[i]=xmlDoc.getElementById("profe008").getElementsByTagName('option')[i].innerHTML;
	}	
	ponerDatosCheckboxHtml2(tituloCheckbox2,opcionesCheckbox2);
	var nres = xmlDoc.getElementById("profe008").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaCheckbox2[i]=xmlDoc.getElementById("profe008").getElementsByTagName("answer")[i].innerHTML;
	}

	//RADIO
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	//Pregunta 9
	var tituloRadio1 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
	var opcionesRadio1 = [];
	var nopt = xmlDoc.getElementById("profe009").getElementsByTagName('option').length;
	for(i = 0; i < nopt; i++){
		opcionesRadio1[i]=xmlDoc.getElementById("profe009").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosRadioHtml1(tituloRadio1,opcionesRadio1);
	var nres = xmlDoc.getElementById("profe009").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaRadio1[i]=xmlDoc.getElementById("profe009").getElementsByTagName('answer')[i].innerHTML;
	}

	//Pregunta 10
	var tituloRadio2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
	var opcionesRadio2 = [];
	var nopt = xmlDoc.getElementById("profe010").getElementsByTagName('option').length;
	for(i = 0; i < nopt; i++){
		opcionesRadio2[i]=xmlDoc.getElementById("profe010").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosRadioHtml2(tituloRadio2 ,opcionesRadio2);
	var nres = xmlDoc.getElementById("profe010").getElementsByTagName('answer').length;
	for(i = 0; i < nres; i++){
		respuestaRadio2[i]=xmlDoc.getElementById("profe010").getElementsByTagName('answer')[i].innerHTML;
	}
} 

//-------------------------------------------------------------//
	//función de generador de preguntas XML en HTML. 

	//Genera las preguntas escritas
	function ponerDatosInputHtml1(t){
		var escritoContainer1 = document.getElementById('preg1');
		var h3 = document.createElement("h3");
		h3.innerHTML = t;
		escritoContainer1.appendChild(h3);
		var input = document.createElement("input");
		input.type = "text";
		input.name = "opcion1";
		escritoContainer1.appendChild(input);
	}

	function ponerDatosInputHtml2(t){
		var escritoContainer2 = document.getElementById('preg2');
		var h3 = document.createElement("h3");
		h3.innerHTML = t;
		escritoContainer2.appendChild(h3);
		var input = document.createElement("input");
		input.type = "text";
		input.name = "opcion2";
		escritoContainer2.appendChild(input);
	}

	//Para generar preguntas de tipo select.
	function ponerDatosSelectHtml1(t,opt){
		document.getElementById("tituloSelect1").innerHTML=t;
		var select = document.getElementsByTagName("select")[0];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value= i;
			select.options.add(option);
		}
	}

	function ponerDatosSelectHtml2(t,opt){
		document.getElementById("tituloSelect2").innerHTML=t;
		var select = document.getElementsByTagName("select")[1];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.value=i;
			select.options.add(option);
		}
	}

	//Para generar preguntas MULTI
	function ponerDatosMultipleHtml1(t, opt){
		document.getElementById("tituloMultiple1").innerHTML=t;
		var multiple = document.getElementsByTagName("select")[2];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.setAttribute("id", "opcion5_" + i);
			option.name = "opcion5";
			multiple.options.add(option);
		}
	}

	function ponerDatosMultipleHtml2(t, opt){
		document.getElementById("tituloMultiple2").innerHTML=t;
		var multiple = document.getElementsByTagName("select")[3];
		for (i = 0; i < opt.length; i++){
			var option = document.createElement("option");
			option.text = opt[i];
			option.setAttribute("id", "opcion6_" + i);
			option.name = "opcion6";
			multiple.options.add(option);
		}
	} 

	//Para generar preguntas de CHECKBOX
	function ponerDatosCheckboxHtml1(t,opt){
		var checkboxContainer=document.getElementById('preg7');
		var h3 = document.createElement("h3");
		h3.innerHTML = t;
		checkboxContainer.appendChild(h3);
		for (i = 0; i < opt.length; i++) {
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion7_" + i);
			input.type="checkbox";
			input.name="opcion7";
			input.id="opcion7_" + i;
			checkboxContainer.appendChild(input);
			checkboxContainer.appendChild(label);
			checkboxContainer.appendChild(document.createElement("br"));
		}
	}

	function ponerDatosCheckboxHtml2(t,opt){
		var checkboxContainer2=document.getElementById('preg8');
		var h3 = document.createElement("h3");
		h3.innerHTML = t;
		checkboxContainer2.appendChild(h3);
		for (i = 0; i < opt.length; i++) {
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion8_" + i);
			input.type="checkbox";
			input.name = "opcion8";
			input.id = "opcion8_" + i;
			checkboxContainer2.appendChild(input);
			checkboxContainer2.appendChild(label);
			checkboxContainer2.appendChild(document.createElement("br"));
		}	
	} 

	//Para generar preguntas de tipo RADIO

	function ponerDatosRadioHtml1(t,opt){
		var radioContainer =document.getElementById('preg9');
		var h3 = document.createElement("h3");
		h3.innerHTML = t;
		radioContainer.appendChild(h3);
		for(i = 0; i < opt.length; i++){
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion9_" + i);
			input.id ="opcion9_" + i;
			input.type="radio";
			input.name="opcion9";
			input.value=i;
			radioContainer.appendChild(input);
			radioContainer.appendChild(label);
			radioContainer.appendChild(document.createElement("br"));
		}
	}

	function ponerDatosRadioHtml2(t,opt){
		var radioContainer2 =document.getElementById('preg10');
		var h3 = document.createElement ('h3');
		h3.innerHTML=t;
		radioContainer2.appendChild(h3);
		for(i = 0; i < opt.length; i++){
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML=opt[i];
			label.setAttribute("for", "opcion10_" + i);
			input.id ="opcion10_" + i;
			input.type="radio";
			input.name="opcion10";
			input.value=i;
			radioContainer2.appendChild(input);
			radioContainer2.appendChild(label);
			radioContainer2.appendChild(document.createElement("br"));
		}
	}

	//----------------------------------------------------------------------------------
	//Corrección de preguntas

	//Corrección del text
	function corregirEscrito1() {
		var text = formElement.elements.opcion1.value;
		if (text == respuestaEscrita1) {
			darRespuestaHtml("P1: Correcto");
			nota +=1;
		}
		else{
			darRespuestaHtml("P1: Incorrecto");
		}
	}

	function corregirEscrito2(){
		var text = formElement.elements.opcion2.value;
		if(text == respuestaEscrita2){
			darRespuestaHtml("P2: Correcto");
			nota +=1;
		}else{
			darRespuestaHtml("P2: Incorrecto");
		}
	}

	//Correccion del select
	function corregirSelect1(){
		var sel = parseInt(formElement.elements.opcion3.value);
		if((sel) == respuestaSelect1){
			darRespuestaHtml("P3: Correcta");
			nota +=1;
		}else{
			darRespuestaHtml("P3: Incorrecta");
		}
	}

	function corregirSelect2(){
		var sel = parseInt(formElement.elements.opcion4.value);
		if((sel) == respuestaSelect2){
			darRespuestaHtml("P4: Correcta");
			nota +=1;
		}else{
			darRespuestaHtml("P4: Incorrecta");
		}
	}

	//corrección multiple.
	function corregirMultiple1(){
		var f = formElement;
		var escorrecta = [];
		for (i = 0; i < f.opcion5.length; i++){
			if(f.opcion5[i].selected) {
				escorrecta[i] = false;
				for (j = 0; j < respuestaMultiple1.length; j++){
					if (i == respuestaMultiple1[j]) escorrecta[i] = true;
				}
				if (escorrecta[i]){
					nota +=1.0;
					darRespuestaHtml("P5: Correcta");
				}else{
					darRespuestaHtml("P5: Incorrecta");
				}
			}
		}
	}

	function corregirMultiple2(){
		var f = formElement;
		var escorrecta = [];
		for (i = 0; i < f.opcion6.length; i++){
			if(f.opcion6[i].selected){
				escorrecta[i] = false;
				for (j = 0; j < respuestaMultiple2.length; j++){
					if (i == respuestaMultiple2[j]) escorrecta[i] = true;
				}
				if(escorrecta[i]){
					darRespuestaHtml("P6: Correcta");
					nota +=1;
				}else{
					darRespuestaHtml("P6: Incorrecta");
				}
			}
		}
	}

	//Correccion de checkbox
	function corregirCheckbox1(){
		var f=formElement;
		var escorrecta = [];
		for(i = 0; i < f.opcion7.length; i++){
			if (f.opcion7[i].checked) {
				escorrecta[i] = false;
				for (j = 0; j < respuestaCheckbox1.length; j++){
					if (i == respuestaCheckbox1[j]) escorrecta[i] = true;
				}
				if(escorrecta[i]){
					nota +=1.0/respuestaCheckbox1.length;
					darRespuestaHtml("P7: Corrrecta");
				}else{
					nota -=1.0/respuestaCheckbox1.length;
					darRespuestaHtml("P7: Incorrecta");
				}
			}
		}
	}

	function corregirCheckbox2(){
		var f=formElement;
		var escorrecta = [];
		for(i < 0; i < f.opcion8.length; i++){
			if (f.opcion8[i].checked){
				escorrecta[i] = false;
				for (j = 0; j < respuestaCheckbox2.length; j++){
					if (i == respuestaCheckbox2[j]) escorrecta[i] = true;
				}
				if(escorrecta[i]){
					nota +=1.0/respuestaCheckbox2.length;
					darRespuestaHtml("P8: Correcta");
				}else{
					nota -=1.0/respuestaCheckbox2.length;
					darRespuestaHtml("P8: Incorrecta");
				}
			}
		}
	}

	//Corrección radio
	function corregirRadio1(){
		var rad1 = formElement.elements.opcion9.value;
		if(rad1 == respuestaRadio1) {
			nota +=1.0;
			darRespuestaHtml("P9: Respuesta correcta");
		}else{
			nota -=1.0/respuestaRadio1.length;
			darRespuestaHtml("P9: Respuesta incorrecta");
		}
	}

	function corregirRadio2(){
		var rad2 = formElement.elements.opcion10.value;
		if(rad2 == respuestaRadio2){
			nota +=1.0;
			darRespuestaHtml("P10: Respuesta correcta");
		}else{
			nota -=1.0;
			darRespuestaHtml("P10: Respuesta incorrecta");
		}
	}

	//-------------------------------------------------------------------------------------
	//Preparacion la presentacion de las respuesta
	function darRespuestaHtml(r){
		var p = document.createElement("p");
		var node = document.createTextNode(r);
		p.appendChild(node);
		document.getElementById('resultados').appendChild(p);
	}

	function presentarNota(){
		darRespuestaHtml("Nota: " + nota.toFixed(2) + "puntos sobre 10");
		document.getElementById("resultadosDiv").style.display = "block";
		}

	function iniciar() {
		document.getElementById('resultados').innerHTML = "";

		nota=0.0;
	}

	//Comprobar si las respuestas están llenas.
	function comprobar(){
		var f = formElement;
		var checked = false;
		
		//Escrito 1
		if(f.elements.opcion1.value==""){
			f.elements.opcion1.focus();
			alert("Te falta rellenar la pregunta 1");
			return false;
		} 
	
		//Escrito 2
		if (f.elements.opcion2.value==""){
			f.elements.opcion2.focus();
			alert("Te falta rellenar la pregunta 2");
			return false;
		}

		//SELECT 1
		if (f.elements.opcion3.value == -1){
			f.elements.opcion3.focus();
			alert("Te falta rellenar la pregunta 3");
			return false;
		} 

		//SELECT 2
		if (f.elements.opcion4.value == -1){
			f.elements.opcion4.focus();
			alert("Te falta rellenar la pregunta 4");
			return false;
		}
		
		//MULTI 1
		if (f.elements.opcion5.value == ""){
			alert("Te falta rellenar la pregunta 5");
			f.elements.opcion5.focus();
			return false;
		} 

		//MULTI 2
		if (f.elements.opcion6.value == ""){
			alert("Te falta rellenar la pregunta 6");
			f.elements.opcion6.focus();
			return false;
		}

		//Checkbox1
		for (i = 0; i < f.opcion7.length; i++){
			if(f.opcion7[i].checked) checked = true;
		}
		if(!checked) {
			f.elements.opcion7[0].focus();
			alert("Te falta rellenar la pregunta 7");
			return false;
		}

		checked = false;

		//Checkbox2
		for (i = 0; i < f.opcion8.length; i++){
			if(f.opcion8[i].checked) checked = true;
		}
		if(!checked) {
			f.elements.opcion8[0].focus();
			alert("Te falta rellenar la pregunta 8");
			return false;
		}

		checked = false;

		//RADIO1
		for (i = 0; i < f.opcion9.length; i++){
			if (f.opcion9[i].checked) checked = true;
		}
		if(!checked){
			f.elements.opcion9[0].focus();
			alert("Te falta rellenar la pregunta 9");
			return false;
		}
		checked = false;

		//RADIO2
		for(i = 0; i < f.opcion10.length; i++){
			if (f.opcion10[i].checked) checked = true;
		}
		if (!checked){
			f.elements.opcion10[0].focus();
			alert("Te falta rellenar la pregunta 10");
			return false;
		}

		return true;
	}
	//================================================================================================//	
