import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3jCg7V3Y_hSltPvQakmhs11oTE2mGFHE",
    authDomain: "okaprendeingles-fb42e.firebaseapp.com",
    projectId: "okaprendeingles-fb42e",
    storageBucket: "okaprendeingles-fb42e.appspot.com",
    messagingSenderId: "190093464111",
    appId: "1:190093464111:web:a6cf62bca12db4fea1ecda",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar los datos en Firebase
async function guardarDatos(evaluador, cliente, calificacion, observaciones) {
    try {
        await addDoc(collection(db, "Encuesta"), {
            Evaluador: evaluador,
            Cliente: cliente,
            Calificacion: calificacion,
            Observaciones: observaciones,
            Fecha: new Date().toLocaleString(),
        });
        console.log("Datos guardados exitosamente.");
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
    }
}

// Manejar la encuesta
document.querySelectorAll(".emoji").forEach((emoji, index) => {
    emoji.addEventListener("click", async () => {
        const evaluador = sessionStorage.getItem("evaluador");
        const cliente = sessionStorage.getItem("cliente");
        const observaciones = document.getElementById("observaciones").value;
        const calificacion = index + 1;

        // Guardar los datos en Firebase
        await guardarDatos(evaluador, cliente, calificacion, observaciones);

        // Redirigir a la página de finalización
        window.location.href = "finEncuesta.html";
    });
});
