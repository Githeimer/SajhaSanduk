import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Define public and protected paths
  const isPublicPath =  path === '/login' || path === '/signup';
  const isProtectedPath = path.startsWith('/profile') || path.startsWith('/dashboard') || path.startsWith('/marketplace');

  // Redirect logged-in users away from public pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/marketplace', request.nextUrl.origin));
  }

  // Redirect users without a token away from protected pages
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  // Allow access if none of the above conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard', '/marketplace', '/', '/login', '/signup'], // Include all relevant paths for middleware
};
