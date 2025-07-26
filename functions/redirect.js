export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Si la ruta es /blog o /blog/ redirige a /blog.html
  if (pathname === '/blog' || pathname === '/blog/') {
    return Response.redirect(`${url.origin}/blog.html`, 301);
  }

  // Si la ruta es / o /index, redirige a /index.html
  if (pathname === '/' || pathname === '/index') {
    return Response.redirect(`${url.origin}/index.html`, 301);
  }

  // Para todo lo demás, permite que siga la petición normal (pasa al archivo estático)
  return fetch(context.request);
}
