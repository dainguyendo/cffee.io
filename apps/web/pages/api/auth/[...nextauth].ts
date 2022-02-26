import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../db";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token, user }) => {
  //     if (session?.user) {
  //       session.user.id = user.id;
  //     }

  //     if (session?.accessToken) {
  //       session.accessToken = token.accessToken;
  //     }

  //     return session;
  //   },
  // },
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
});
