import { type NextRequest, NextResponse } from 'next/server';
import { ROOT_ROUTE, SESSION_COOKIE_NAME } from './constants';

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set
  if (!session) {
    const absoluteURL = new URL((('/login')), request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
//   if (session && request.nextUrl.pathname === ROOT_ROUTE) {
//     const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
}

export const config = {
    matcher: ["/", "/about", "/wip"]
}

