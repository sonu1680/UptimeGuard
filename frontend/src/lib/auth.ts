
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";


export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_ID_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/auth", // 
  },

  session: {
    strategy: "jwt", 
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email || "",
              name: user.name || "",
            },
          });
        }
        user.id = existingUser?.id||""
      }
      return true;
    },

    async jwt({ token, user }) {
   
      if (user) {
        token.userId = user.id; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token.userId) {
        //@ts-ignore
        session.user.id = token.userId;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};


export const { handlers, auth } = NextAuth(authConfig);
