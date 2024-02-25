import { z } from "zod";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {
  getOrCreateUser,
  getUserByUsername,
  loginUser
} from "@/lib/users/users";

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email()
});
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith"
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password"
        }
      },
      async authorize(
        credentials:
          | Record<"email" | "username" | "password", string>
          | undefined
      ): Promise<User | null> {
        const validatedCredentials = credentialsSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          console.error("Validation error:", validatedCredentials.error);
          throw new Error("Invalid credentials");
        }

        const userExists = await getUserByUsername(credentials?.username ?? "");

        if (!userExists) {
          const user = await getOrCreateUser(
            credentials?.password ?? "",
            credentials?.username ?? "",
            credentials?.email ?? ""
          );
          return {
            name: user.userName,
            password: user.password,
            email: user.email,
            id: user.id.toString()
          };
        }

        const loginSuccessful = await loginUser(
          credentials?.username ?? "",
          credentials?.password ?? ""
        );
        if (loginSuccessful) {
          return {
            email: userExists.email,
            password: userExists.password,
            name: userExists.userName,
            id: userExists.id.toString()
          };
        } else {
          console.log("INCORRECT PASSWORD");
          return null;
        }
      }
    })
  ]
};
