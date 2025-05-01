import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const userId = request.cookies.get('user_id')?.value;

  const pathname = request.nextUrl.pathname;

  // Redirection si accès à /dashboard sans être connecté
  if (pathname.match(/^\/(fr|en)\/(dashboard|profile|settings)(\/.*)?$/) && !userId) {
    const locale = pathname.split('/')[1] || 'fr'; // ex: "fr" ou "en"
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return response; // sinon, laisser passer
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
