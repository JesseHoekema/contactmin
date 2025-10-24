export async function handle({ event, resolve }) {
  const allowedOrigins = [
    'https://jessehoekema.com',
    'http://localhost:5173'
  ];

  const origin = event.request.headers.get('origin');
  const safeOrigin = origin ?? '';

  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(safeOrigin) ? safeOrigin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  const response = await resolve(event);

  if (allowedOrigins.includes(safeOrigin)) {
    response.headers.set('Access-Control-Allow-Origin', safeOrigin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}