import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

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

  // IMPORTANT : mettre secure et path=/
  (await
    // IMPORTANT : mettre secure et path=/
    cookies()).set('user_id', String(user.id), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ message: 'Connecté' });
}


