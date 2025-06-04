import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_ID_SECRET || "",
    }),
  ],

  //-----------------

  // pages: {
  //   signIn: "/auth",
  // },
  callbacks: {
    async signIn({ user, account }) {
      let existingUser = await prisma.user.findFirst({
        where: { email: user.email || "" },
      });

      if (!existingUser && account) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email || "",
            name: user.name || "",
          
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });
        token.sub = existingUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
