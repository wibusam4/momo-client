import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwtDecode from "jwt-decode";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if (session) {
  //   const token = jwtDecode(session.token);
  //   if (token.exp * 1000 < Date.now()) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = `/auth/logout`;
  //     return await NextResponse.redirect(url);
  //   }
  // }
  if (req.nextUrl.pathname.startsWith("/auth") && session) {
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }

  if (needAuth(req, "/momo", session)) {
    const url = req.nextUrl.clone();
    url.pathname = `/auth/signin`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

const needAuth = (req: NextRequest, param: string, session: any) => {
  return req.nextUrl.pathname.startsWith(param) && !session;
};
