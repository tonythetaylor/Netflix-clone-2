import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import prisma from "./lib/prismadb";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string; };
        console.log(email, password)
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword)

        if (!isCorrectPassword) {
          throw new Error('Incorret password')
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET

})