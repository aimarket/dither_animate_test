import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const { pathname } = request.nextUrl;

  // Check if user is accessing a dashboard route without authentication
  if (pathname.startsWith('/flights') ||
      pathname.startsWith('/rockets') ||
      pathname.startsWith('/motors') ||
      pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/flights', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
