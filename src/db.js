//Firebase

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_API_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_API_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Contenedor de los comentarios
const commentsContainer = document.getElementById('commentsContainer');

// formulario
const form = document.getElementById('comentarioForm');


//Envio de datos a firebase
form.addEventListener('submit', async (e) => {
  e.preventDefault();

const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (!username || !comment) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    await addDoc(collection(db, "comentarios"), {
      username,
      comment
    });
    alert("Comentario enviado correctamente.");
    form.reset();
    await leerComentarios(); 
  } catch (error) {
    console.error("Error al enviar comentario:", error);
    alert("Error al enviar comentario.");
  }
});

async function leerComentarios() {
  try {
    const querySnapshot = await getDocs(collection(db, "comentarios"));
    const comments = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && Object.keys(data).length > 0) {
        comments.push(data);
      } else {
        console.warn("Documento vacío o inválido:", doc.id);
      }
    });
    mostrarComentarios(comments);
  } catch (error) {
    console.error("Error al leer comentarios:", error);
  }
}

function mostrarComentarios(comments) {
  commentsContainer.innerHTML = ''; 
  comments.forEach(({ username, comment }) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <h4>${username}</h4>
      <p>${comment}</p>
      <br>
      <br>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

leerComentarios();
