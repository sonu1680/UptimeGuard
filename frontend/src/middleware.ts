import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  console.log(secret)
  const token = await getToken({ req, secret });
   console.log(token)
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/monitor")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/monitor/:path*"],
};
