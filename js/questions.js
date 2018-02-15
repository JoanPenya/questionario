// fichoro xml que está en el servidor rawgit
var url="index.xml";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  // función personalizada que gestiona la respuesta a la petición de fichero
  gestionarXml(this); 
 }
};
xhttp.open("GET", url, true); //url del fichero
xhttp.send();

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
  var xmlDoc = dadesXml.responseXML;
  document.getElementById("p1").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
  document.getElementById("t1").innerHTML = xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue;
  document.getElementById("r1").innerHTML = xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue;


}