export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Método no permitido', { status: 405 });
  }

  const projectId = context.env.FIREBASE_PROJECT_ID;

  const body = await context.request.json();
  const { username, comment } = body;

  if (!username || !comment) {
    return new Response('Faltan datos', { status: 400 });
  }

  // Construye el payload para Firestore
  const data = {
    fields: {
      username: { stringValue: username },
      comment: { stringValue: comment }
    }
  };

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/comentarios`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(`Error guardando comentario: ${errorText}`, { status: 500 });
  }

  return new Response('Comentario agregado', { status: 200 });
}
