import { z } from "zod";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {
  getOrCreateUser,
  getUser,
  getUserByUsername,
  loginUser,
} from "@/lib/users/users";

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(
        credentials:
          | Record<"email" | "username" | "password", string>
          | undefined,
      ): Promise<User | null> {
        try {
          const validatedCredentials = credentialsSchema.safeParse(credentials);

          if (!validatedCredentials.success) {
            console.error("Validation error:", validatedCredentials.error);
            return null;
          }

          let user = await getUserByUsername(credentials?.username ?? "");

          if (!user) {
            user = await getOrCreateUser(
              credentials?.password ?? "",
              credentials?.username ?? "",
              credentials?.email ?? "",
            );
          }

          const loginSuccessful = await loginUser(
            credentials?.username ?? "",
            credentials?.password ?? "",
          );

          if (!loginSuccessful) {
            return null;
          }

          return {
            email: user.email,
            password: user.password,
            name: user.userName,
            id: user.id.toString(),
            role: user.role,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.role = user.role;
        if (account?.provider === "github") {
          const gitUser = await getUser(profile?.email || "");
          token.role = gitUser?.role;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
