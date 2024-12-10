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

// Función para verificar credenciales y obtener el cargo
async function verificarCredenciales(nombre, contrasena) {
    const evaluadoresRef = collection(db, "evaluadores");
    const q = query(evaluadoresRef, where("NombreApellido", "==", nombre), where("Contraseña", "==", contrasena));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        return { esValido: true, cargo: data.Cargo };
    }
    return { esValido: false };
}

// Manejar el formulario de login
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const { esValido, cargo } = await verificarCredenciales(username, password);

    if (esValido) {
        sessionStorage.setItem("evaluador", username); // Guardar el nombre del evaluador en el almacenamiento temporal

        if (cargo === "Representante legal" || cargo === "Director") {
            window.location.href = "controlAdmin.html"; // Redirigir a la página de administración
        } else {
            window.location.href = "formulario.html"; // Redirigir al formulario
        }
    } else {
        alert("Usuario o contraseña incorrectos. Intente nuevamente.");
    }
});
