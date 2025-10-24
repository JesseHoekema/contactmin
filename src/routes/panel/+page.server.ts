import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getUserFromCookie } from '$lib/auth';
import { getAllSubmissions } from '$lib/submissions';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get('session');

  if (!token) {
    throw redirect(303, '/login');
  }
  const user = await getUserFromCookie(token);

  if (!user) {
    throw redirect(303, '/login');
  }

  const submissions = await getAllSubmissions();

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    submissions
  };
};
