import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function FavoriteApods() {
  return (
    <div>
      <h1>Favorite Apods</h1>
    </div>
  );
}
