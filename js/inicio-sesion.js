function ingresar() {
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;

    if (correo == "" || clave == "") {
        alert("Debe completar todos los campos");
        return;
    }

    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (clave.length != 4) {
        alert("La clave debe tener exactamente 4 caracteres");
        return;
    }

    if (correo == "admin@demo.cl" && clave == "1234") {
        var admin = {
            nombre: "Administrador",
            correo: correo,
            rol: "Administrador"
        };
        localStorage.setItem("usuario_sesion", JSON.stringify(admin));
        window.location.href = "admin.html";
        return;
    }

    if (correo == "usuario@demo.cl" && clave == "5678") {
        var demo = {
            nombre: "Usuario",
            apellidos: "Prueba",
            run: "19.876.543-2",
            correo: "usuario@demo.cl",
            comuna: "Santiago",
            region: "Metropolitana"
        };
        localStorage.setItem("usuario_sesion", JSON.stringify(demo));
        window.location.href = "usuario.html";
        return;
    }

    if (typeof listadoProfesionales !== "undefined") {
        for (var i = 0; i < listadoProfesionales.length; i++) {
            if (listadoProfesionales[i].correo === correo && listadoProfesionales[i].clave === clave) {
                localStorage.setItem("usuario_sesion", JSON.stringify(listadoProfesionales[i]));
                window.location.href = "nutricionista.html";
                return;
            }
        }
    }

    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    var encontrado = null;

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo == correo && usuarios[i].clave == clave) {
            encontrado = usuarios[i];
            break;
        }
    }

  if (encontrado !== null) {
        localStorage.setItem("usuario_sesion", JSON.stringify(encontrado));
        if (encontrado.rol === "Nutricionista") {
            window.location.href = "nutricionista.html";
        } else if (encontrado.rol === "Administrador" || encontrado.rol === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "usuario.html";
        }
    } else {
        alert("Correo o clave incorrectos");
    }
}