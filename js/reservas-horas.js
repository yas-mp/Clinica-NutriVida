document.addEventListener("DOMContentLoaded", function () {
    cargarServiciosReserva();
    cargarProfesionalesReserva(); 

    const formularioReserva = document.getElementById("formulario-reserva");
    if (formularioReserva) {
        formularioReserva.addEventListener("submit", guardarReserva);
    }
});

function cargarServiciosReserva() {
    const servicioReserva = document.getElementById("reserva-servicio");
    if (!servicioReserva) return;
    
    if (typeof servicios !== "undefined") {
        for (let i = 0; i < servicios.length; i++) {
            let ser = servicios[i];
            servicioReserva.innerHTML += `<option value="${ser.nombre}">${ser.nombre} - $${ser.precio}</option>`;
        }
    }    
}

function cargarProfesionalesReserva() {
    const seleccionarNutri = document.getElementById("reserva-profesional");
    if (!seleccionarNutri) return;

    if(typeof listadoProfesionales !== "undefined"){
        for (let i = 0; i< listadoProfesionales.length; i++){
            let prof = listadoProfesionales[i];

            let mostrarNombre = `${prof.nombre} ${prof.apellidos}`;
            seleccionarNutri.innerHTML += `<option value="${mostrarNombre}">${mostrarNombre}</option>`;
        }
    }

}

function guardarReserva(r) {
    r.preventDefault();

    const rut = document.getElementById("reserva-rut").value.trim();
    const servicio = document.getElementById("reserva-servicio").value;
    const fecha = document.getElementById("reserva-fecha").value;
    const hora = document.getElementById("reserva-hora").value;

    if (typeof EsRunValido === "function" && !EsRunValido(rut)) {
        alert("El RUT ingresado no es válido, inténtalo de nuevo.");
        return;
    }
    
    const seleccionarProfesional = document.getElementById("reserva-profesional").value;

    const nuevaReserva = {
        id: Date.now(),
        rut: rut,
        servicio: servicio,
        fecha: fecha,
        hora: hora,
        profesional: seleccionarProfesional,
        estado: "Confirmada"
    };
    let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];
    listaReservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(listaReservas));

    alert("La reserva ha sido realizada con éxito.");
    r.target.reset();
}