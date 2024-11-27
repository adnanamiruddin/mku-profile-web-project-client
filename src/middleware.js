import { NextResponse } from "next/server";

const PRIVATE_PAGE = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const isLoggedIn = request.cookies.get("actkn");
  if (PRIVATE_PAGE.includes(request.nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = [
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  "/((?!api|_next/static|_next/image|favicon.ico).*)",
];
