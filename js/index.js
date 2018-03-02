//Cargar la página principal
window.onload = function(){

	//Botones necesarios para PC
	document.getElementById("venD").onclick=function(){abrirPc();}
	document.getElementById("xD").onclick=function(){cerrarPc();}

	//Botones necesarios para movil
	document.getElementById("venM").onclick=function(){abrirM();}
	document.getElementById("xM").onclick=function(){cerrarM();}

	//Definición de las ventanas
	function abrirPc(){
		document.getElementById("instruccionesD").style.display="inline-block";
	}	

	function cerrarPc(){
		document.getElementById("instruccionesD").style.display="none";
	}

	function abrirM(){
		document.getElementById("instruccionesM").style.display="inline-block";
	}

	function cerrarM(){
		document.getElementById("instruccionesM").style.display="none";
	}

}