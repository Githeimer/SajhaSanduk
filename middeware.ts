import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'; 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicPath = path === '/login' || path === '/signup';

  // If user is already logged in and tries to visit login or signup page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/marketplace', request.nextUrl.origin));
  }

  // If the user is not logged in and tries to access protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!); 
    
    }
  } catch (error) {
  
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard', '/marketplace'], 
};
