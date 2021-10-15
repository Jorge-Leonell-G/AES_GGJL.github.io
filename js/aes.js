//inicio de la funcion de cifrado
$(function(){
    $("#cifrar").on("click", function(event){
        //asi evitamos que se refresque el formulario
        event.preventDefault();
        var cadena = $("#cadena").val();
        var password = $("#password").val();
        //variable de error
        let hasError = false;

        //condiciones para validacion sin los required en el form
        if(cadena == null || cadena.length == 0){
            alert("Error: Ingrese su mensaje a cifrar");
            hasError = true;
            //return false;
        }

        if(password == null || password.length == 0){
            alert("Error: Tiene que ingresar una clave válida");
            hasError = true;
            //return false;
        }

        if(!document.querySelector('input[name="option"]:checked')) {
            alert('Error: Seleccione un tipo de cifrado');
            hasError = true;
            //return false;
        }

        //condiciones para la longitud de las claves segun el tipo de cifrado
        if(document.getElementById('option1').checked && password.length != 16){
            alert("Error: La longitud de la clave debe de ser sólo de 16 caracteres");
            hasError = true;

        }else if(document.getElementById('option2').checked && password.length != 24){
            alert("Error: La longitud de la clave debe de ser sólo de 24 caracteres");
            hasError = true;

        }else if(document.getElementById('option3').checked && password.length != 32){
            alert("Error: La longitud de la clave debe de ser sólo de 32 caracteres");
            hasError = true;
        }

        //cifrado
        var encriptar = CryptoJS.AES.encrypt(cadena, password).toString();
        //todo se pasa a una cadena para manipular la variable
        $("#cifrado").val(encriptar);
        //impresion en la terminal
        console.log(cadena);
        console.log(password);
        console.log(encriptar);
        console.log(encriptar, password);
        
    });
});

//inicio de la funcion para la descarga
$(function(){
    $("#descargar").on("click", function(event){
        event.preventDefault();
        //variables para el contenido y nombre del archivo
        var data = $("#cifrado").val();
        var nombretxt = $("#nombretxt").val();

        //constante para la creacion del elemento de almacenamiento 
        const element = document.createElement("a");
        const contenido = data;
        //objeto tipo Blob (grandes volumenes de bits)
        blob = new Blob([contenido], {type: "data:text/plain;charset=utf-8," + encodeURIComponent(data)});
        url = window.URL.createObjectURL(blob);
        element.href = url;
        element.setAttribute('download-default', nombretxt);
        element.download = nombretxt;
        element.click();
        window.URL.revokeObjectURL(url);
        

        /*codigo descartado por culpa de las normas de seguridad de google y sus servicios ...

        element.style.display='none';

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));

        //si el usuario no le asigna un nombre, entonces se descarga con el nombre 'download-default' xD
        element.setAttribute('download-default', nombretxt);
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        */
    });
});
