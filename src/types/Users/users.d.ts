export type User = {
  name: String;
  email: string;
};

export type Session = {
  user: {
    name: string;
    email: string;
  };
  expires: string;
};
