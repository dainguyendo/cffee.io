import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
