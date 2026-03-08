import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const isPublicRoute = req.nextUrl.pathname.startsWith("/login");

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};