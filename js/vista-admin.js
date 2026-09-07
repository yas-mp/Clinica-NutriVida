document.addEventListener("DOMContentLoaded", function () {
  mostrarServiciosPanel();
  mostrarUsuariosPanel();
  mostrarReservasPanel();
});

function mostrarReservasPanel() {
  let tablaReservas = document.getElementById("tabla-reservas");
  if (!tablaReservas) return;

  tablaReservas.innerHTML = "";

  let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];
  if (listaReservas.length === 0) {
    tablaReservas.innerHTML = `<tr><td colspan="6" class="text-center py-3">No hay horas reservadas.</td></tr>`;
    return;
  }

  for (let i = 0; i < listaReservas.length; i++) {
    let reserva = listaReservas[i];

    tablaReservas.innerHTML += `
            <tr>
                <td><strong>${reserva.rut}</strong></td>
                <td>${reserva.servicio}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora} hrs</td>
                <td><span class="badge bg-success">${reserva.estado}</span></td>
                <td>
                <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${i})">
                    Cancelar
                </button>
                </td>
            </tr>
        `;
  }
}

function cancelarReserva(index) {
  if (confirm("¿Estás seguro de cancelar esta reserva?")) {
    let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];
    listaReservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(listaReservas));
    mostrarReservasPanel();
  }
}

function mostrarUsuariosPanel() {
  let tablaUsuarios = document.getElementById("tabla-usuarios");

  if (!tablaUsuarios) return;

  tablaUsuarios.innerHTML = "";

  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (listaUsuarios.length === 0) {
    tablaUsuarios.innerHTML = `<tr><td colspan="6" class="text-center">No hay usuarios registrados.</td></tr>`;
    return;
  }

  for (let i = 0; i < listaUsuarios.length; i++) {
    let user = listaUsuarios[i];
    let nombreCompleto =
      `${user.nombre || user.nombres || ""} ${user.apellidos || ""}`.trim();

    tablaUsuarios.innerHTML += `
            <tr>
                <td><strong>${user.rut || user.run || "N/A"}</strong></td>
                <td>${nombreCompleto || "Sin nombre"}</td>
                <td>${user.correo || "N/A"}</td>
                <td>${user.direccion || "N/A"}, ${user.comuna || ""}</td>
                <td><span class="badge bg-secondary">${user.rol || "Paciente"}</span></td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${i})">
                        Eliminar
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="modificarUsuario(${i})">
                        Modificar
                    </button>
                </td>
            </tr>
        `;
  }
}

function eliminarUsuario(index) {
  if (confirm("¿Estás seguro de que deseas eliminar a este usuario?")) {
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    mostrarUsuariosPanel();
  }
}

function modificarUsuario(index) {
  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let user = listaUsuarios[index];

  let nuevoCorreo = prompt(
    "Ingrese el nuevo correo electronico:",
    user.correo || "",
  );
  if (nuevoCorreo !== null && nuevoCorreo.trim() !== "") {
    user.correo = nuevoCorreo.trim();
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    mostrarUsuariosPanel();
  }
}

function mostrarServiciosPanel() {
  let tablaServicios = document.getElementById("tabla-servicios");

  if (!tablaServicios) return;

  tablaServicios.innerHTML = "";

  for (let i = 0; i < servicios.length; i++) {
    let servi = servicios[i];

    tablaServicios.innerHTML += `
            <tr> 
                <td><strong>${servi.codigo}</strong></td>
                <td>${servi.nombre}</td>
                <td>${servi.profesional}</td>
                <td>${servi.precio}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarServicio(${servi.id})">
                        Eliminar
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="modificarServicio(${servi.id})">
                        Modificar
                    </button>
                </td>
            </tr>    
        `;
  }
}

function modificarServicio(id) {
  let nuevoPrecio = prompt("Ingrese el nuevo precio para el servicio:");

  if (nuevoPrecio !== null && nuevoPrecio !== "") {
    for (let i = 0; i < servicios.length; i++) {
      if (servicios[i].id === id) {
        servicios[i].precio = parseInt(nuevoPrecio);
        break;
      }
    }
    mostrarServiciosPanel();
  }
}

function eliminarServicio(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
    for (let i = 0; i < servicios.length; i++) {
      if (servicios[i].id === id) {
        servicios.splice(i, 1);
        break;
      }
    }
    mostrarServiciosPanel();
  }
}


function cerrarSesion() {
  localStorage.removeItem("usuario_sesion");
  alert("Has cerrado sesión correctamente.");
  window.location.href = "../index.html";
}
