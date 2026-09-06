document.addEventListener("DOMContentLoaded", function () {
  cargarDatosUsuario();
  cargarCitas();
});

function cargarDatosUsuario() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_sesion"));

  if (!usuarioActivo) {
    alert("Debes iniciar sesión para acceder al portal.");
    window.location.href = "iniciar-sesion.html";
    return;
  }
  const titulo = document.getElementById("titulo-bienvenida");
  if (titulo) {
    titulo.textContent = `Bienvenido(a), ${usuarioActivo.nombre}`;
  }

  if (document.getElementById("perfil-nombre")) {
    document.getElementById("perfil-nombre").value =
      `${usuarioActivo.nombre} ${usuarioActivo.apellidos || ""}`;
    document.getElementById("perfil-run").value =
      usuarioActivo.run || "No informado";
    document.getElementById("perfil-correo").value = usuarioActivo.correo;
    document.getElementById("perfil-ubicacion").value =
      `${usuarioActivo.comuna || "Santiago"}, ${usuarioActivo.region || "RM"}`;
  }
}

function cargarCitas() {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const tbody = document.querySelector("#tabla-citas tbody");

  if (!tbody) return;
  tbody.innerHTML = "";

  if (reservas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No tienes citas registradas actualmente.</td></tr>`;
    return;
  }

  reservas.forEach((cita, index) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${cita.servicio}</strong></td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td><span class="badge bg-success">Confirmada</span></td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm" onclick="cancelarCita(${index})">
            Cancelar
          </button>
        </td>
      </tr>
    `;
  });
}

function cancelarCita(index) {
  if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    cargarCitas();
  }
}

function cerrarSesion(){
    localStorage.removeItem("usuario_sesion");
    alert("Has cerrado sesión correctamente.");
    window.location.href="../index.html";
}
