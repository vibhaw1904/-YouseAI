import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // To create a custom accessToken

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Manually create a JWT token for the session (e.g., accessToken)
        const accessToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.NEXTAUTH_SECRET || "default_secret", // Use a secret
          { expiresIn: '1h' } // Set token expiration if needed
        );

        // Return user object with token and other fields
        return { 
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          accessToken // Return this token so that it can be set in JWT and session callbacks
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add accessToken to token object when user logs in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken; // Add custom accessToken here
      }
      return token;
    },
    async session({ session, token }) {
      // Attach accessToken to the session object so it can be used on the frontend
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.accessToken = token.accessToken; // Pass the token to session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
