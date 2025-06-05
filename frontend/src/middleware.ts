import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/monitor"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth", "/dashboard/:path*", "/monitor/:path*"],
};
