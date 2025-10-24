import type { RequestHandler } from './$types';
import { loginWithEmailAndPassword } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response('Email and password are required', { status: 400 });
  }

  const result = await loginWithEmailAndPassword(email, password);

  if (!result) {
    return new Response('Invalid credentials', { status: 401 });
  }

  return new Response(JSON.stringify({ email: result.user.email }), {
    status: 200,
    headers: { 'Set-Cookie': result.cookie }
  });
};