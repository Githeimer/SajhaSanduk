import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token =request.cookies.get('token')?.value || '';

  // Define public and protected paths
  const isPublicPath =  path === '/login' || path === '/signup';
  const isProtectedPath = path.startsWith('/profile') || path.startsWith('/dashboard');


  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/marketplace', request.nextUrl.origin));
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard', '/dashboard/:path*', '/marketplace', '/', '/login', '/signup'],
};
