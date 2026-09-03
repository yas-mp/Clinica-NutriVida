let noticias = [
  {
    id: 1,
    titulo: "¿Qué es el colesterol?",
    imagen: "../images/menu-semanal-blog.jpg",
    descripcionCorta:`No es casualidad que todo el mundo haya oído hablar del colesterol alto (hipercolesterolemia), 
                        dado que es un problema frecuente entre la población y que genera un mayor 
                        riesgo de sufrir enfermedades cardiovasculares (ECV).`,
    descripcionLarga: `El colesterol es una molécula lipídica (grasa) presente en 
                            el organismo como parte de membranas, tejidos y también en la sangre. 
                            Eso hace que el colesterol sea necesario para la formación de vitaminas, 
                            hormonas y ácidos biliares entre otras cosas. Por tanto, el colesterol es necesario, 
                            siempre y esencial para la salud, pero si se superan sus valores óptimos es cuando aumenta 
                            el riesgo de ECV. Dicho esto, debemos tener en cuenta que el colesterol es producido 
                            por nuestro cuerpo pero también lo obtenemos a través de la alimentación y cuando se 
                            acumula gran cantidad en las arterias por un exceso en plasma, entonces se dificulta 
                            la circulación sanguínea y aparecen los riesgos cardiovasculares.`,
  },
  {
    id: 2,
    titulo: "¿Cómo controlar la ansiedad al comer?",
    imagen: "../images/comida-blog.jpg",
    descripcionCorta: `Comer es un acto biológico necesario, pero también una conducta cargada de significado emocional, 
                            social y cultural. Sin embargo, cuando la ingesta deja de estar guiada por el hambre fisiológica 
                            y pasa a responder a impulsos difíciles de controlar, hablamos de comer compulsivamente.`,
    descripcionLarga: `El tratamiento debe ser integral y adaptado a cada persona. No basta con prescribir una dieta. 
                            Sin duda, la terapia cognitivo-conductual (TCC) es uno de los enfoques con mayor evidencia científica. 
                            Permite identificar detonantes emocionales, modificar pensamientos disfuncionales relacionados con la comida
                            y el cuerpo, desarrollar habilidades de regulación emocional, etc.
                            Otras terapias como la terapia de aceptación y compromiso (ACT) o el 
                            mindfulness ayudan a tolerar el malestar sin recurrir a la comida.
                            En lo referente a la intervención nutricional, el objetivo no es prohibir, sino estructurar. 
                            Por ejemplo: establecer horarios regulares de comida, evitar restricciones extremas, reintroducir 
                            todos los grupos de alimentos de forma equilibrada, etc.
                            También resulta interesante realizar una evaluación médica, ya que en algunos casos pueden 
                            existir comorbilidades como obesidad, síndrome metabólico, 
                            depresión o ansiedad clínica que requieren abordaje específico.`,
  },
  {
    id: 3,
    titulo: "Vitamina para vegetarianos y veganos",
    imagen: "../images/vitaminas-blog.jpg",
    descripcionCorta: `Seguir un patrón de alimentación vegano o vegetariano ofrece numerosos beneficios: 
                            menor riesgo de enfermedad cardiovascular, 
                            menor prevalencia de diabetes y mayor ingesta de fibra.`,
    descripcionLarga: ` En las dietas vegetarianas o veganas, si no hay malabsorción y la dieta no es restrictiva, 
                        sino variada y equilibrada, no haría falta suplementar con ninguna vitamina salvo con B12.
                        Eso sí, al igual que en las dietas omnívoras, los valores de vitamina D en las analíticas suelen estar reducidos, 
                        por lo que el profesional de la salud deberá valorar su suplementación (aunque eso no debe desplazar a la exposición solar de manera saludable).
                        Salvo en estos dos casos, el resto de las vitaminas pueden obtenerse fácilmente a través de la 
                        alimentación y por tanto no es necesaria su suplementación. Recordemos que la suplementación 
                        no debe desplazar a los alimentos que siempre serán nuestra primera opción.
                        Finalmente, aclarar que para que estas pautas puedan adaptarse a cada caso es recomendable 
                        trabajar de la mano de un nutricionista que te ayude a personalizar tu alimentación y 
                        suplementación (en caso de ser necesaria) a tu estilo de vida, necesidades y gustos. 
                        Podría interesarte este artículo: alimentos ricos en proteína vegetal.`,
  },
];

function cargarBlog() {
  const contenedor = document.getElementById("listarNoticias");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  for (let i = 0; i < noticias.length; i++) {
    let n = noticias[i];

    contenedor.innerHTML += `
      <div class="col">
        <div class="card-blog shadow-sm align-items-center p-3">
          <img src="${n.imagen}" class="card-img-top img-icono" style="width: 250px; height: 250px; border-radius: 20px; object-fit: cover;" alt="${n.titulo}" />
          
          <div class="card-body text-center d-flex flex-column w-100">
            <h5 class="card-title fw-bold">${n.titulo}</h5>
            <p class="card-text text-start fs-6">${n.descripcionCorta}</p>
            
            <div id="texto-${n.id}" class="d-none mt-2 text-start text-secondary fs-6">
              <hr>
              <p style="text-align: justify;">${n.descripcionLarga}</p>
            </div>

            <button id="btn-${n.id}" onclick="mostrarMas(${n.id})" class="btn btn-success mx-auto mt-auto">
              Leer más
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

function mostrarMas(id) {
  const bloque = document.getElementById(`texto-${id}`);
  const boton = document.getElementById(`btn-${id}`);

  if (bloque.classList.contains("d-none")) {
    bloque.classList.remove("d-none");
    boton.innerText = "Cerrar";
  } else {
    bloque.classList.add("d-none");
    boton.innerText = "Leer más";
  }
}

document.addEventListener("DOMContentLoaded", cargarBlog);