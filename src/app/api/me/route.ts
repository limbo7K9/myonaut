import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: payload.id as number },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur introuvable' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Token invalide ou expiré' }, { status: 403 });
  }
}
