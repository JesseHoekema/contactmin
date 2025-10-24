import { json, type RequestHandler } from '@sveltejs/kit';
import { addSubmission } from '$lib/submissions';

export const POST: RequestHandler = async ({ request }) => {
    const { name, email, message, turnstileToken } = await request.json();

    if (!name || !email || !message || !turnstileToken) {
        return json(
            {
                error: 'Missing required fields',
                required: ['name', 'email', 'message', 'turnstileToken']
            },
            { status: 400 }
        );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return json({ error: 'Invalid email format' }, { status: 400 });
    }
    try {
        const secretKey = process.env.TURNSTILE_SECRET_KEY;
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: secretKey ?? '',
                response: turnstileToken
            })
        });

        const result = await verifyRes.json();

        if (!result.success) {
            return json({ error: 'CAPTCHA verification failed' }, { status: 400 });
        }
    } catch (err) {
        console.error('CAPTCHA verification error:', err);
        return json({ error: 'CAPTCHA verification error' }, { status: 500 });
    }

    try {
        const submission = await addSubmission({
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
        });

        return json(
            {
                success: true,
                id: submission.id,
                message: 'Submission saved successfully'
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error('Database error:', err.message);
        return json(
            {
                error: 'Database error',
                details: err.message
            },
            {
                status: err.code === 'ETIMEDOUT' ? 504 : 500
            }
        );
    }
};