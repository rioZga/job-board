import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        userDbEntry(profile.sub, "google");
        return { ...profile, role: "user", id: profile.sub };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      profile(profile: GithubProfile) {
        userDbEntry(profile.id.toString(), "github");
        return { ...profile, role: "user", id: profile.id.toString() };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const existingCompany = await prisma.company.findUnique({
          where: { email: credentials.email },
        });

        if (!existingCompany) return null;

        const passwordMatch = await compare(
          credentials.password,
          existingCompany.password,
        );

        if (!passwordMatch) return null;

        return {
          id: existingCompany.id,
          email: existingCompany.email,
          name: existingCompany.name,
          role: "company",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user)
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};

async function userDbEntry(id: string, provider: string) {
  await prisma.user.upsert({
    where: {
      id,
    },
    create: {
      id,
      provider,
    },
    update: {},
  });
}
