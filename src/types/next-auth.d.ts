import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account } from "~/model/User.model";
declare module "next-auth" {
  interface Session {
    user: User.user;
    token: User.token;
  }

  interface User {
    user: Account;
    token: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: User.user;
    token: User.token;
  }
}
