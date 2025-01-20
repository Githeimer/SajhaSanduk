import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';
  const isPublicPath = path === '/' || path === '/login' || path === '/signup';


  if(isPublicPath && token)
  {
    return NextResponse.redirect(new URL('/marketplace',request.nextUrl.origin));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/profile','/dashboard'], //these are protected routes
};
