import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { routing } from './i18n/routing';

const protectedRoutes = ['dashboard', 'nutrition', 'tools', 'workout'];

export default async function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl;

  // Rediriger depuis "/" vers "/<locale>"
  if (pathname === '/') {
    const defaultLocale = routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
  }

  // Si la route est protégée (matche un segment comme /fr/dashboard)
  const segments = pathname.split('/');
  const isProtected = protectedRoutes.includes(segments[2]);

  if (!isProtected) return createMiddleware(routing)(req);

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    await jwtVerify(token, secret);
    return createMiddleware(routing)(req);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Couvre TOUT sauf fichiers, api, etc.
};