import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ message: 'Connecté' });
}
