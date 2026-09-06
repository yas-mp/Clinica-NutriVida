
let servicio = JSON.parse(localStorage.getItem("servicio"));

document.getElementById("imagen").src = servicio.imagen;
document.getElementById("nombre").textContent = servicio.nombre;
document.getElementById("descripcion").textContent = servicio.descripcion;
document.getElementById("tipo").textContent = "Tipo: " + servicio.tipo;
document.getElementById("duracion").textContent = "Duración: " + servicio.duracion;
document.getElementById("modalidad").textContent = "Modalidad: " + servicio.modalidad;
document.getElementById("profesional").textContent = "Profesional: " + servicio.profesional;
document.getElementById("precio").textContent = "Precio: $" + servicio.precio + " CLP";
