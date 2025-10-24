import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getUserFromCookie } from '$lib/auth';
import { deleteSubmissionById } from '$lib/submissions';

export const POST: RequestHandler = async (event) => {
  const token = event.cookies.get('session');

  if (!token) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const user = await getUserFromCookie(token);
  if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await event.request.json();
    const id = typeof body?.id === 'number' ? body.id : parseInt(body?.id);

    if (!id || Number.isNaN(id)) {
      return json({ success: false, error: 'Invalid or missing id' }, { status: 400 });
    }

    await deleteSubmissionById(id);

    return json({ success: true });
  } catch (err: any) {
    console.error('Delete submission error:', err);
    return json({ success: false, error: err?.message || 'Failed to delete submission' }, { status: 500 });
  }
};
