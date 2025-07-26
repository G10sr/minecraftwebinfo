export async function onRequest(context) {
  const projectId = context.env.FIREBASE_PROJECT_ID;

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/comentarios`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
      // No Authorization header porque no usas token
    }
  });

  if (!res.ok) {
    return new Response('Error fetching data from Firestore', { status: 500 });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
