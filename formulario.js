// Cargar el nombre del evaluador desde el sessionStorage
document.addEventListener("DOMContentLoaded", () => {
    const evaluador = sessionStorage.getItem("evaluador");

    if (evaluador) {
        document.getElementById("evaluador").value = evaluador; // Llenar el campo con el nombre del evaluador
    } else {
        alert("Error: No se encontró el evaluador. Por favor, inicie sesión nuevamente.");
        window.location.href = "login.html"; // Redirigir al login si no hay evaluador
    }
});

// Manejar el envío del formulario
document.getElementById("formulario-evaluacion").addEventListener("submit", (e) => {
    e.preventDefault();
    const evaluador = document.getElementById("evaluador").value;
    const cliente = document.getElementById("nombreCliente").value;

    if (evaluador && cliente) {
        sessionStorage.setItem("cliente", cliente); // Guardar el cliente en sessionStorage
        window.location.href = "encuesta.html"; // Redirigir a la encuesta
    } else {
        alert("Por favor, complete todos los campos.");
    }
});
