import { User } from "../Users/users";

export type Apod = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export type FavoriteApod = {
  id: String;
  user: User;
  userId: String;
  apod: Apod;
  apodId: String;
};
