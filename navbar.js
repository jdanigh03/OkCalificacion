// Botón para ir hacia atrás
document.getElementById("btn-back").addEventListener("click", () => {
    window.history.back(); // Navega hacia la página anterior
});

// Botón para cerrar sesión
document.getElementById("btn-logout").addEventListener("click", () => {
    sessionStorage.clear(); // Limpia el almacenamiento de sesión
    window.location.href = "index.html"; // Redirige a la página de login
});
