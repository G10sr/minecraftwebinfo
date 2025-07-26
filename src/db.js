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
    const res = await fetch('/addComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, comment })
    });

    if (!res.ok) {
      throw new Error('Error al enviar comentario');
    }

    alert("Comentario enviado correctamente.");
    form.reset();
    await leerComentarios();

  } catch (error) {
    console.error(error);
    alert("Error al enviar comentario.");
  }
});

async function leerComentarios() {
  try {
    const res = await fetch('/firestore'); // Función de Cloudflare que creaste
    if (!res.ok) {
      throw new Error('Error al obtener comentarios');
    }
    const data = await res.json();

    // La estructura de data será la que devuelve Firestore REST API,
    // así que extraemos los campos necesarios:
    const comments = (data.documents || []).map(doc => {
      const fields = doc.fields || {};
      return {
        username: fields.username?.stringValue || 'Anon',
        comment: fields.comment?.stringValue || ''
      };
    });

    mostrarComentarios(comments);

  } catch (error) {
    console.error(error);
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
