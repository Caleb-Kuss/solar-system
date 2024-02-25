import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

type User = {
  id: string;
  name: string;
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
        password: {
          label: "Password",
          type: "password",
          placeholder: "password"
        }
      },
      async authorize(credentials): Promise<User | null> {
        const user: User = { id: "1", name: "test", password: "password" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return Promise.resolve(user);
        }
        return null;
      }
    })
  ]
};
