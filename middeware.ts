import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';
  const isPublicPath = ['/login', '/signup', '/'].includes(path);
  
  if (isPublicPath && token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET || '');
      return NextResponse.redirect(new URL('/profile', request.nextUrl.origin));
    } catch (error) {
      console.error('Invalid token on public path:', error);
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '');
      console.log('Token decoded:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
