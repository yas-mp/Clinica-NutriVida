function formulario(event){

    if(event) event.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let comentario = document.getElementById("comentarios").value;

    if(nombre === "" || correo === "" || comentario === "" ) {
        alert("Debe completar todos los campos");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    if(correo.length > 100){
        alert("El correo no puede superar los 100 carácteres");
        return;
    }

    if(nombre.length > 100){
        alert("El nombre no puede superar los 100 carácteres");
        return;
    }

    if(comentario.length > 500){
        alert("Los comentarios no pueden superar los 500 carácteres");
        return;
    }

    alert("Formulario enviado con éxito");

}