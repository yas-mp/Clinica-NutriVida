document.addEventListener("DOMContentLoaded", function () {
  cargarDatosNutri();
  mostrarCitasNutricionista();
  mostrarPacientesNutricionista();
});

function cargarDatosNutri() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_sesion"));

  if (!usuarioActivo) {
    alert("Debes iniciar sesión para acceder al panel.");
    window.location.href = "../pages/inicio-sesion.html";
    return;
  }

  const esNutri =
    usuarioActivo.rol === "Nutricionista" ||
    usuarioActivo.rol === "Administrador";
  if (!esNutri) {
    alert("Acceso denegado: Esta vista es exclusiva para Nutricionistas.");
    window.location.href = "../index.html";
    return;
  }

  const nombreComp =
    `${usuarioActivo.nombre || usuarioActivo.nombres || ""} ${usuarioActivo.apellidos || ""}`.trim();

  document.getElementById("perfil-nombre").value =
    nombreComp || "Nutricionista";
  document.getElementById("perfil-run").value =
    usuarioActivo.rut || usuarioActivo.run || "No informado";
  document.getElementById("perfil-correo").value =
    usuarioActivo.correo || "No informado";

  const inputRol = document.getElementById("perfil-rol");
  if (inputRol) {
    inputRol.value =
      usuarioActivo.especialidad || usuarioActivo.rol || "Nutricionista";
  }

  const titulo = document.getElementById("titulo-bienvenida-nutri");
  if (titulo) {
    titulo.textContent = `Panel Nutricionista - Bienvenida(o) Dr(a). ${usuarioActivo.nombre || "Profesional"}`;
  }
}

function mostrarCitasNutricionista() {
  const tablaCitas = document.getElementById("tabla-citas-nutri");
  if (!tablaCitas) return;

  tablaCitas.innerHTML = "";

  const usuarioActivo = JSON.parse(localStorage.getItem("usuario_sesion"));
  const listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const citas = listaReservas.filter(
    (res) => !res.profesional || res.profesional.includes(usuarioActivo.nombre),
  );

  if (citas.length === 0) {
    tablaCitas.innerHTML = `<tr><td colspan="6" class="text-center py-3">No hay pacientes agendados actualmente.</td></tr>`;
    return;
  }

  citas.forEach((res) => {
    const indexReal = listaReservas.findIndex(
      (r) =>
        r.id === res.id ||
        (r.rut === res.rut && r.fecha === res.fecha && r.hora === res.hora),
    );

    tablaCitas.innerHTML += `
      <tr>
        <td><strong>${res.rut || res.run || "N/A"}</strong></td>
        <td>${res.servicio || "Consulta Nutricional"}</td>
        <td>${res.fecha || "Sin fecha"}</td>
        <td>${res.hora || "00:00"} hrs</td>
        <td>
          <span class="badge ${
            res.estado === "Atendido"
              ? "bg-primary"
              : res.estado === "cancelada"
                ? "bg-danger"
                : "bg-success"
          }">
            ${res.estado || "Confirmada"}
          </span>
        </td>
        <td class="text-center">
          ${
            res.estado === "cancelada"
              ? `<span class="badge bg-secondary">Sin acciones</span>`
              : `
                <button class="btn btn-sm btn-outline-success me-1" onclick="completarAtencion(${indexReal})">
                  Atendido
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="cancelarAtencion(${indexReal})">
                  Cancelar
                </button>
              `
          }
        </td>
      </tr>
    `;
  });
}

function completarAtencion(index) {
  let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];
  if (index !== -1 && listaReservas[index]) {
    listaReservas[index].estado = "Atendido";
    localStorage.setItem("reservas", JSON.stringify(listaReservas));
    mostrarCitasNutricionista();
    alert("Atención registrada como realizada.");
  }
}

function cancelarAtencion(index) {
  let listaReservas = JSON.parse(localStorage.getItem("reservas")) || [];

  if (index !== -1 && listaReservas[index]) {
    listaReservas[index].estado = "cancelada";
    localStorage.setItem("reservas", JSON.stringify(listaReservas));
    mostrarCitasNutricionista();
    alert("La cita ha sido cancelada.");
  }
}

function mostrarPacientesNutricionista() {
  const tablaPacientes = document.getElementById("tabla-pacientes-nutri");
  if (!tablaPacientes) return;

  tablaPacientes.innerHTML = "";
  const listaUsuarios =
    JSON.parse(localStorage.getItem("usuarios")) ||
    JSON.parse(localStorage.getItem("usuariosRegistrados")) ||
    [];

  const pacientes = listaUsuarios.filter(
    (u) => !u.rol || u.rol === "Cliente" || u.rol === "Paciente",
  );

  if (pacientes.length === 0) {
    tablaPacientes.innerHTML = `<tr><td colspan="4" class="text-center py-3">No hay pacientes registrados.</td></tr>`;
    return;
  }

  for (let u of pacientes) {
    let nombreCompleto =
      `${u.nombre || u.nombres || ""} ${u.apellidos || ""}`.trim();
    tablaPacientes.innerHTML += `
      <tr>
        <td><strong>${u.rut || u.run || "N/A"}</strong></td>
        <td>${nombreCompleto || "Sin nombre"}</td>
        <td>${u.correo || "N/A"}</td>
        <td>${u.comuna || u.direccion || "N/A"}</td>
      </tr>
    `;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuario_sesion");
  alert("Has cerrado sesión correctamente.");
  window.location.href = "../index.html";
}
