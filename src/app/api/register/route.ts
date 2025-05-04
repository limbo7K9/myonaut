import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

interface RegisterBody {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  birthdate: string;
  gender: string;
  weight: string;
  height: string;
}

export async function POST(req: Request) {
  try {
    const body: RegisterBody = await req.json();
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
      phone,
      birthdate,
      gender,
      weight,
      height,
    } = body;

    if (!username || !password || !confirmPassword || !email || !firstname || !lastname || !birthdate || !gender || !weight || !height) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already taken' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone: phone || null,
        birthdate: new Date(birthdate),
        gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
      },
    });

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
