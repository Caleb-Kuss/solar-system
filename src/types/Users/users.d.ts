export type User = {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type Session = {
  user: {
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
  expires: string;
} | null;
