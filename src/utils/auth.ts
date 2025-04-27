import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession, type AuthOptions } from "next-auth";
import db from "./db";
import { md5Hash } from "@/helpers";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", },
        password: { label: "Password", type: "password", }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) return null;

        const hashedPassword = md5Hash(credentials.password);

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
            password: hashedPassword,
          }
        });

        if (!user) return null;

        return user;
        
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
};


export const auth = async () => {

  return await getServerSession (authOptions);

}