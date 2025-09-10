document.addEventListener("DOMContentLoaded", () => {
  mostrarFraseRomantica();
});


// Modal para imágenes
function openModal(src, caption) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");

  modal.style.display = "block";
  modalImg.src = src;
  modalCaption.textContent = caption;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Agregar foto a la galería
function agregarFoto() {
  const url = prompt("URL de la imagen:");
  const descripcion = prompt("Descripción o fecha del recuerdo:");

  if (url && descripcion) {
    const gallery = document.querySelector(".gallery");

    const photoDiv = document.createElement("div");
    photoDiv.className = "photo";
    photoDiv.onclick = () => openModal(url, descripcion);

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Nuevo recuerdo";

    const desc = document.createElement("p");
    desc.className = "description";
    desc.textContent = descripcion;

    photoDiv.appendChild(img);
    photoDiv.appendChild(desc);

    gallery.appendChild(photoDiv);

    // 🔹 Guardar en localStorage
    const fotosGuardadas = JSON.parse(localStorage.getItem("galeria")) || [];
    fotosGuardadas.push({ url, descripcion });
    localStorage.setItem("galeria", JSON.stringify(fotosGuardadas));
  }
}
