import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getUserFromCookie } from '$lib/auth';
import { getSubmissionById } from '$lib/submissions';

export const load: PageServerLoad = async ({ cookies, params }) => {
  const token = cookies.get('session');

  if (!token) {
    throw redirect(303, '/login');
  }

  const user = await getUserFromCookie(token);

  if (!user) {
    throw redirect(303, '/login');
  }

  const submission = await getSubmissionById(Number(params.messageId));

  if (!submission) {
    throw redirect(303, '/panel');
  }
  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    submission
  };
};
