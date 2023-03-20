import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { Account } from "~/model/User.model";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 2 * 30 * 60,
  },
  session: {
    maxAge: 2 * 30 * 60,
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const user = await axios
            .post("https://api.sieuthiapi.site/api/user/login", {
              username,
              password,
            })
            .then((result) => {
              return result.data.message;
            })
            .catch((error) => {
              throw new Error("Authorize error:", error);
            });
          return user as any;
        } catch (err: any) {
          throw new Error("Authorize error:", err);
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const newUser = user.user as Account;
        token.user = newUser;
        token.token = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.token = token.token;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
