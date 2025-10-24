import { logout } from '$lib/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  try {
    const cookie = await logout(event);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (cookie) {
      headers['Set-Cookie'] = cookie;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Logged out successfully' }),
      {
        status: 200,
        headers
      }
    );
  } catch (err) {
    console.error('Logout error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to log out' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
