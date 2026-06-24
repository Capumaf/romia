import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/os") && pathname !== "/os/login") {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/os/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/auth/:path*", "/os/:path*"],
};