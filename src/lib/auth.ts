import { prisma } from '$lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { serialize, parse } from 'cookie';
import type { RequestEvent } from '@sveltejs/kit';

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; 

export async function loginWithEmailAndPassword(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt
    }
  });

  const cookie = serialize('session', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt
  });

  return { cookie, user };
}

export async function getUserFromCookie(token: string) {
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}

export async function logout(event: RequestEvent) {
  const cookies = parse(event.request.headers.get('cookie') || '');
  const token = cookies['session'];
  if (!token) return;

  await prisma.session.deleteMany({ where: { token } });
  return serialize('session', '', { path: '/', maxAge: 0 });
}
export async function createUser(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  return user;
}