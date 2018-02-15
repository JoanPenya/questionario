//Funcionamiento del questionario//

var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestaCheckbox= [];
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
			corregirNumber();
			corregirSelect();
			corregirCheckbox();
			presentarNota();
		}
		return false;
	}

	//FUNCIÓN DE LECTOR XML
	var xhhtp = new XMLHttpRequest();
	xhhtp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/index.xml", true);
	xhhtp.send();
}

//===============================================================
//Se ejecuta el fichero mencionado XML
//xmlDOC es el documento leido XML.
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc

	//NUMBER
	//Recuperamos el título y la respuesta correcta de Input, 
	//guardamos el número secreto 
	var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
	ponerDatosInputHtml(tituloInput);
	numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].iinerHTML);

	//SELECT
	//Recuperamos el título y las opciones, guardamos la respuesta correcta.
	var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
	var opcionesSelect = [];
	var nopt = xmlDoc.getElementById("profe_002").getElementsByTagName('option').length;
		for ( i = 0; i< nopt; i++){
			opcionesSelect[i] = xmlDoc.getElementById("profe_002").getElementsByTagName('option')[i].innerHTML;
		}
	ponerDatosSelectHtml(tituloSelect,opcionesSelect);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

	//CheckBox
	//Recuperamos el título y las opciones, guardamos las respuesta correcta.
	var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
	var opcionesCheckbox = [];
	var nopt = xmlDoc.getElementById("profe_003").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++){
		opcionesCheckbox[i]=xmlDoc.getElementById("profe_003").getElementsByTagName('option')[i].innerHTML;
	}	
	ponerDatosCheckbocHtml(tituloCheckbox,opcionesCheckbox);
	var nres = xmlDoc.getElementById("profe_003").getElementByTagName("answer")[i].innerHTML;
	for(i = 0; i < nres; i++){
		respuestasCheckbox[i]=xmlDoc.getElementById("profe_003").
	}
}