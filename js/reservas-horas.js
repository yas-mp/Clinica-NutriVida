document.addEventListener("DOMContentLoaded", function (){
    cargarServiciosReserva();

    const formularioReserva = document.getElementById("formulario-reserva");
    if(formularioReserva){
        formularioReserva.addEventListener("submit", guardarReserva);

    }
});

function cargarServiciosReserva(){
    const servicioReserva = document.getElementById("reserva-servicio");
    if(!servicioReserva) return;
    if (typeof servicios !== "undefined"){
        for(let i =0; i < servicios.length; i++){
            let ser = servicios[i];

            servicioReserva.innerHTML += `<option value="${ser.nombre}">${ser.nombre} - $${ser.precio}</option>`;

        }
    }    
}

function guardarReserva(r){
    r.preventDefault();

    const rut = document.getElementById("reserva-rut").value.trim();
    const servicio = document.getElementById("reserva-servicio").value;
    const fecha= document.getElementById("reserva-fecha").value;
    const hora = document.getElementById("reserva-hora").value;

    if(typeof EsRunValido === "function" && !EsRunValido(rut)){
        alert("El RUT ingresado no es válido, intentálo de nuevo.")
        return;
    }

    const nuevaReserva = {
        id: Date.now(),
        rut: rut,
        servicio: servicio,
        fecha:fecha,
        hora: hora,
        estado: "confirmada"

    };

    let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];
    listaReservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(listaReservas));

    alert("La reserva ha sido realizada con éxito.")
    r.target.reset();

}