import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Cargar evaluadores en el dropdown
async function cargarEvaluadores() {
    const evaluadoresRef = collection(db, "evaluadores");
    const evaluadoresSnapshot = await getDocs(evaluadoresRef);
    const evaluadorSelect = document.getElementById("evaluador-select");

    evaluadorSelect.innerHTML = '<option value="">Todos los evaluadores</option>';
    evaluadoresSnapshot.forEach((doc) => {
        const data = doc.data();
        const option = document.createElement("option");
        option.value = data.NombreApellido;
        option.textContent = data.NombreApellido;
        evaluadorSelect.appendChild(option);
    });
}

// Cargar encuestas en la tabla
async function cargarEncuestas(filtroEvaluador = "") {
    const encuestasRef = collection(db, "Encuesta");
    const tablaBody = document.getElementById("tabla-encuestas").querySelector("tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos

    let q = encuestasRef;
    if (filtroEvaluador) {
        q = query(encuestasRef, where("Evaluador", "==", filtroEvaluador));
    }
    const encuestasSnapshot = await getDocs(q);

    encuestasSnapshot.forEach((doc) => {
        const data = doc.data();
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${data.Evaluador}</td>
            <td>${data.Cliente}</td>
            <td>${data.Calificacion}</td>
            <td>${data.Observaciones}</td>
            <td>${data.Fecha}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Filtro por evaluador
document.getElementById("evaluador-select").addEventListener("change", (e) => {
    cargarEncuestas(e.target.value);
});

(async () => {
    await cargarEvaluadores();
    await cargarEncuestas();
})();
