import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwtDecode from "jwt-decode";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith("/auth") && session) {
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (
    needAuth(req, "/momo", session) ||
    needAuth(req, "/recharge", session) ||
    needAuth(req, "/user", session)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = `/auth/signin`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

const needAuth = (req: NextRequest, param: string, session: any) => {
  return req.nextUrl.pathname.startsWith(param) && !session;
};
