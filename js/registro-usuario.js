const datosRegiones = [
  {
    region: "Metropolitana",
    comunas: ["Santiago", "Providencia", "Las Condes"],
  },
  {
    region: "La Araucanía",
    comunas: ["Temuco", "Carahue", "Cunco"],
  },
];

function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  if (!selectRegion || !selectComuna) return;

  datosRegiones.forEach((item) => {
    const opcion = document.createElement("option");
    opcion.value = item.region;
    opcion.textContent = item.region;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener("change", function () {
    selectComuna.innerHTML = '<option value="">Selecciona comuna...</option>';

    const regionEncontrada = datosRegiones.find(function (r) {
      return r.region === selectRegion.value;
    });

    if (regionEncontrada) {
      regionEncontrada.comunas.forEach(function (comuna) {
        // CORREGIDO: "option" en vez de "opcion"
        const opcionComuna = document.createElement("option");

        opcionComuna.value = comuna;
        opcionComuna.textContent = comuna;

        selectComuna.appendChild(opcionComuna);
      });
    }
  });
}

function EsRunValido(run) {
  run = run.toUpperCase().replace(/\./g, "").replace(/-/g, "").trim();
  if (run.length < 8) return false;

  const cuerpo = run.slice(0, -1);
  const dvIngresado = run.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvCalculado = "";

  if (resto === 11) dvCalculado = "0";
  else if (resto === 10) dvCalculado = "K";
  else dvCalculado = resto.toString();

  return dvIngresado === dvCalculado;
}

document.addEventListener("DOMContentLoaded", function () {
  cargarRegiones();

  // Buscar formulario por ID o por etiqueta si no tiene ID
  const formulario =
    document.getElementById("formulario-registro") ||
    document.querySelector("form");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      // CORREGIDO: Búsqueda flexible de IDs para "rut" o "run"
      const nombre = document.getElementById("nombre")?.value.trim() || "";
      const apellidos =
        document.getElementById("apellidos")?.value.trim() || "";
      const run =
        (
          document.getElementById("run") || document.getElementById("rut")
        )?.value.trim() || "";
      const correo = document.getElementById("correo")?.value.trim() || "";
      const clave = document.getElementById("clave")?.value || "";
      const region = document.getElementById("region")?.value || "";
      const comuna = document.getElementById("comuna")?.value || "";
      const direccion =
        document.getElementById("direccion")?.value.trim() || "";
      const rol = document.getElementById("rol")?.value || "Cliente";

      if (!EsRunValido(run)) {
        alert("El RUN ingresado no es válido.");
        return;
      }

      if (clave.length < 4 || clave.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
      }

      if (
        region === "" ||
        comuna === "" ||
        region.includes("Selecciona") ||
        comuna.includes("Selecciona")
      ) {
        alert("Debe seleccionar una región y una comuna válidas.");
        return;
      }

      const nuevoUsuario = {
        nombre,
        apellidos,
        run,
        correo,
        region,
        comuna,
        direccion,
        rol,
      };

      let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      listaUsuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

      alert("¡Usuario registrado con éxito!");
      window.location.href = "iniciar-sesion.html";
    });
  }
});
