// ===============================
// 🌸 Lógica principal de la PWA 
// ===============================

// Inicializar animaciones
AOS.init();

// Registrar Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("Service Worker registrado ✅", reg))
      .catch(err => console.error("Error registrando Service Worker:", err));
  });
}

// ===============================
// 🕒 Hora actual en CDMX
// ===============================
function getNowCDMX() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const parts = formatter.formatToParts(new Date());
  const d = {};
  for (const p of parts) if (p.type !== "literal") d[p.type] = p.value;

  return new Date(`${d.year}-${d.month}-${d.day}T${d.hour}:${d.minute}:${d.second}`);
}

// ===============================
// 📅 Configuración de fechas
// ===============================
const startDate = new Date("2025-08-02T00:00:00"); 

const milestones = [
  { name: "Primer Mes", date: "2025-09-11", description: "Cumplimos nuestro primer mes juntos, lleno de momentos especiales 🥰" },
  { name: "Segundo Mes", date: "2025-10-11", description: "Un mes más creciendo juntos y creando recuerdos 📸" },
  { name: "Tercer Mes", date: "2025-11-11", description: "En tres meses me enseñaste que la felicidad se encuentra en lo más simple: en tu voz, en tu risa y en tu amor ✨" },
  { name: "Cuarto Mes", date: "2025-12-11", description: "Nuestro cuarto capítulo de esta historia hermosa, y apenas comienza ✨📖" },
  { name: "Quinto Mes", date: "2026-01-11", description: "Contigo, hasta el tiempo se siente mágico: Cinco meses que parecen un sueño 💫" },
  { name: "Medio Año", date: "2026-02-11", description: "Seis meses a tu lado, seis meses aprendiendo lo que significa amar de verdad 💞" },
  { name: "Séptimo Mes", date: "2026-03-11", description: "Siete meses creciendo juntos, entre complicidad, risas y sueños que no paran de nacer ✨❤️." },
  { name: "Octavo Mes", date: "2026-04-11", description: "Ocho meses que me enseñan que contigo cada instante es un regalo que quiero atesorar 🎁💕." },
  { name: "Noveno Mes", date: "2026-05-11", description: "Nueve meses y mi corazón late aún más fuerte al pensar en todo lo que vivimos y lo que vendrá 💓🌸." },
  { name: "Décimo Mes", date: "2026-06-11", description: "Diez meses de amor verdadero, de abrazos que curan y miradas que hablan más que mil palabras 💞." },
  { name: "Onceavo Mes", date: "2026-07-11", description: "Once meses contigo, y cada día confirmo que eres mi hogar, mi alegría y mi destino 🏡❤️." },
  { name: "Aniversario", date: "2026-08-11", description: "Un año completo de amor, aventuras y momentos inolvidables ✨❤️." },
  { name: "Cumpleaños", date: "2026-08-11", description: "Hoy celebro el día en que nació la persona más especial 💖✨" }
];

// ===============================
// 📌 Cálculos de días y hitos
// ===============================
function getDaysSinceStart() {
  const now = getNowCDMX();
  return Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
}

function updateMainCounter() {
  const days = getDaysSinceStart();
  const mainCountEl = document.getElementById("main-count");
  if (mainCountEl) {
    mainCountEl.textContent = days; // 👈 directo (o animateCount si quieres animación)
  }
}

function renderMilestones() {
  const list = document.getElementById("milestones-list");
  if (!list) return;
  list.innerHTML = "";

  const now = getNowCDMX();
  let lastPast = null;
  let nextFuture = null;

  for (const m of milestones) {
    const mDate = new Date(m.date + "T00:00:00");
    if (mDate <= now) {
      lastPast = m;
    } else {
      nextFuture = m;
      break;
    }
  }

  // Último pasado
  if (lastPast) {
    const date = new Date(lastPast.date + "T00:00:00");
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    const diffText = diffDays === 0 ? "Hace 0 días (¡Hoy!)" : `Hace ${diffDays} días`;

    const li = document.createElement("li");
    li.textContent = `${lastPast.name} — ${diffText}`;
    li.addEventListener("click", () => openMilestoneModal(lastPast, diffText));
    list.appendChild(li);
  }

  // Próximo futuro (con contador)
  if (nextFuture) {
    const countdownEl = document.getElementById("next-countdown");

    function updateCountdown() {
      const now = getNowCDMX();
      const target = new Date(nextFuture.date + "T00:00:00");
      const diff = target - now;

      if (diff <= 0) {
        countdownEl.textContent = `¡Hoy es ${nextFuture.name}! 🎉`;
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${nextFuture.name} — faltan ${days}d ${hours}h ${minutes}m ${seconds}s (${nextFuture.date})`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

// ===============================
// 🌙 Tema oscuro
// ===============================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
}

function updateThemeButton() {
  const icon = document.querySelector("#theme-toggle .icon");
  const label = document.querySelector("#theme-toggle .label");
  if (document.body.classList.contains("dark")) {
    icon.textContent = "☀️";
    label.textContent = "Modo claro";
  } else {
    icon.textContent = "🌙";
    label.textContent = "Modo oscuro";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeButton();

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleDarkMode);
});

// ===============================
// 📤 Compartir
// ===============================
function shareCounter() {
  const days = getDaysSinceStart();
  const text = `¡Llevamos ${days} días juntos! 💖`;

  if (navigator.share) {
    navigator.share({ title: "Nuestro contador de amor", text, url: window.location.href })
      .catch(console.error);
  } else {
    alert("Tu navegador no soporta compartir directamente. Copia este texto:\n" + text);
  }
}

// ===============================
// 📌 Modal de hitos
// ===============================
function openMilestoneModal(milestone, diffText) {
  document.getElementById("milestone-title").textContent = milestone.name;
  document.getElementById("milestone-date").textContent = `📅 Fecha: ${milestone.date}`;
  document.getElementById("milestone-info").textContent = diffText;
  document.getElementById("milestone-description").textContent = milestone.description || "Sin detalles adicionales";
  document.getElementById("milestone-modal").style.display = "block";
}

function closeMilestoneModal() {
  document.getElementById("milestone-modal").style.display = "none";
}

// ===============================
// 🔊 Música
// ===============================
const sonido = new Audio('cora.mp3');
function reproducirSonido() {
  sonido.play();
}
document.addEventListener('click', reproducirSonido, { once: true });

// ===============================
// 🚀 Inicialización
// ===============================
window.addEventListener("load", () => {
  updateMainCounter();
  renderMilestones();
});
