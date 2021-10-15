
//se muestra el contenido del archivo de la siguiente forma
function leerArchivo(e) {
  //posicion incial de la variable archivo
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    //instanciamos la clase FileReader
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      //llamado al metodo
      mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
  }
  
  function mostrarContenido(contenido) {
    var elemento = document.getElementById("contenido");
    elemento.innerHTML = contenido;
  }

  /*
  function mostrarContenidoDescifrado(contenidoDescifrado) {
      var mostrado = document.getElementById("descifrado");
      mostrado.innerHTML = contenidoDescifrado;
  }
  */

  document.getElementById("input-archivo").addEventListener('change', leerArchivo, false);


//voy a manejar la misma estructura de jquery para mis funciones
//descifrado con formato
$(function(){
    $("#descifrar").on("click", function(event){
        event.preventDefault();
        var contenido = $("#contenido").val();
        var password = $("#password").val();
        //var archivo = e.target.files[0];
        //variable de error
        let hasError = false;

        //condiciones para validacion sin los required en el form
        if(contenido == null || contenido.length == 0){
            alert("Error: No hay ningún mensaje suyo a descifrar");
            hasError = true;
            //return false;
        }

        if(password == null || password.length == 0){
            alert("Error: Tiene que ingresar una clave para poder realizar el descifrado");
            hasError = true;
            //return false;
        }

        //descifrado
        var desencriptar = CryptoJS.AES.decrypt(contenido, password).toString(CryptoJS.enc.Utf8);
        //todo se pasa a una cadena para manipular la variable
        $("#descifrado").val(desencriptar).toString(CryptoJS.enc.Utf8);
        //llamamos a nuestro metodo para mostrar el contenido descifrado y con formato
        /*
        var mostrado = desencriptar;
        mostrarContenidoDescifrado(mostrado);
        */
        //impresion en la terminal
        console.log(contenido);
        console.log(password);
        console.log(desencriptar);
        
    });
});
