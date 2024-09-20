import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        // Connect to the database
        await connectDB();

        // Check if credentials exist
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        // Find the user in the database by email
        const user = await User.findOne({ email: credentials.email }).select("+password");

        // If the user doesn't exist
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        // If the password doesn't match
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Return the user object without the password field
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Optional custom sign-in page
  },
};

export default authOptions;
