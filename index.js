document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("perfilUsuario");
  contenedor.style.display = "grid";
  contenedor.style.gridTemplateColumns =
    "repeat(auto-fill, minmax(300px, 1fr))";
  contenedor.style.gap = "20px";
  contenedor.style.padding = "20px";

  try {
    const respuesta = await fetch("https://randomuser.me/api/?results=10");
    const datos = await respuesta.json();

    contenedor.innerHTML = "";

    datos.results.forEach((usuario) => {
      const nombreCompleto = `${usuario.name.first} ${usuario.name.last}`;
      const genero = usuario.gender === "male" ? "Masculino" : "Femenino";
      const ubicacion = `${usuario.location.city}, ${usuario.location.state}, ${usuario.location.country}`;
      const correo = usuario.email;
      const fechaNacimiento = new Date(usuario.dob.date)
        .toISOString()
        .split("T")[0];
      const fotografia = usuario.picture.large;

      const cardHTML = `
        <div class="card" style="background:white; border-radius:10px; padding:20px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
          <img src="${fotografia}" alt="Fotografía de ${nombreCompleto}" style="width:100%; border-radius:10px; margin-bottom:15px;" />
          <h2 style="margin-top:0;">${nombreCompleto}</h2>
          <p><strong>Género:</strong> ${genero}</p>
          <p><strong>Ubicación:</strong> ${ubicacion}</p>
          <p><strong>Correo electrónico:</strong> ${correo}</p>
          <p><strong>Fecha de nacimiento:</strong> ${fechaNacimiento}</p>
        </div>
      `;

      contenedor.innerHTML += cardHTML;
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar los datos de los usuarios.</p>";
    console.error("Error al obtener los datos del API:", error);
  }
});
