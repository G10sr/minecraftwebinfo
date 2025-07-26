export async function onRequest(context) {
  const projectId = context.env.VITE_API_FIREBASE_PROJECT_ID;

  if (!projectId) {
    return new Response('VITE_API_FIREBASE_PROJECT_ID no está definido', { status: 500 });
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/comentarios`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(`Error fetching data from Firestore: ${errorText}`, { status: 500 });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
