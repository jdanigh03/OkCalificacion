import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Referencias a los elementos HTML
const form = document.getElementById("form-agregar-evaluador");
const tablaBody = document.getElementById("tabla-evaluadores").querySelector("tbody");

// Cargar evaluadores en la tabla
async function cargarEvaluadores() {
    const evaluadoresRef = collection(db, "evaluadores");
    const evaluadoresSnapshot = await getDocs(evaluadoresRef);
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos

    evaluadoresSnapshot.forEach((doc) => {
        const data = doc.data();
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${doc.id}</td>
            <td><span class="nombre">${data.NombreApellido}</span></td>
            <td><span class="cargo">${data.Cargo}</span></td>
            <td><button class="btn-eliminar" data-id="${doc.id}">Eliminar</button></td>
            <td><button class="btn-editar" data-id="${doc.id}">Editar</button></td>
        `;
        tablaBody.appendChild(fila);
    });

    // Agregar eventos a los botones
    agregarEventosBotones();
}

// Agregar evaluador
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombreApellido = document.getElementById("nombreApellido").value;
    const ci = document.getElementById("ci").value; // Se usará como Contraseña
    const cargo = document.getElementById("cargo").value;

    try {
        await addDoc(collection(db, "evaluadores"), {
            NombreApellido: nombreApellido,
            Contraseña: ci,
            Cargo: cargo,
        });

        Swal.fire({
            title: "¡Evaluador agregado!",
            text: "El evaluador se agregó exitosamente.",
            icon: "success",
        });

        form.reset(); // Limpiar el formulario
        cargarEvaluadores(); // Recargar la tabla
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al agregar el evaluador.",
            icon: "error",
        });
    }
});

// Eliminar evaluador
async function eliminarEvaluador(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteDoc(doc(db, "evaluadores", id));
            Swal.fire({
                title: "¡Eliminado!",
                text: "El evaluador ha sido eliminado.",
                icon: "success",
            });
            cargarEvaluadores(); // Recargar la tabla
        }
    });
}

// Alternar entre edición y guardado
function editarEvaluador(btn) {
    const fila = btn.closest("tr");
    const nombreSpan = fila.querySelector(".nombre");
    const cargoSpan = fila.querySelector(".cargo");

    if (btn.textContent === "Editar") {
        // Cambiar a modo edición
        const nombreInput = document.createElement("input");
        nombreInput.type = "text";
        nombreInput.value = nombreSpan.textContent;
        nombreInput.className = "nombre-input";

        const cargoInput = document.createElement("input");
        cargoInput.type = "text";
        cargoInput.value = cargoSpan.textContent;
        cargoInput.className = "cargo-input";

        nombreSpan.replaceWith(nombreInput);
        cargoSpan.replaceWith(cargoInput);

        btn.textContent = "Guardar";
    } else {
        // Guardar cambios
        const nombreInput = fila.querySelector(".nombre-input");
        const cargoInput = fila.querySelector(".cargo-input");
        const id = btn.dataset.id;

        updateDoc(doc(db, "evaluadores", id), {
            NombreApellido: nombreInput.value,
            Cargo: cargoInput.value,
        })
            .then(() => {
                Swal.fire({
                    title: "¡Actualizado!",
                    text: "El evaluador ha sido actualizado correctamente.",
                    icon: "success",
                });

                // Cambiar de vuelta a modo visualización
                const nombreSpan = document.createElement("span");
                nombreSpan.textContent = nombreInput.value;
                nombreSpan.className = "nombre";

                const cargoSpan = document.createElement("span");
                cargoSpan.textContent = cargoInput.value;
                cargoSpan.className = "cargo";

                nombreInput.replaceWith(nombreSpan);
                cargoInput.replaceWith(cargoSpan);

                btn.textContent = "Editar";
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al actualizar el evaluador.",
                    icon: "error",
                });
            });
    }
}

// Agregar eventos a los botones
function agregarEventosBotones() {
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            eliminarEvaluador(id);
        });
    });

    document.querySelectorAll(".btn-editar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editarEvaluador(e.target);
        });
    });
}

// Inicializar
cargarEvaluadores();
