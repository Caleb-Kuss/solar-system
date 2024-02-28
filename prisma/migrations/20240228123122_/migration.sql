/*
  Warnings:

  - You are about to drop the `_ApodToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApodToUser" DROP CONSTRAINT "_ApodToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApodToUser" DROP CONSTRAINT "_ApodToUser_B_fkey";

-- AlterTable
ALTER TABLE "Apod" ADD COLUMN     "favoritedById" INTEGER;

-- DropTable
DROP TABLE "_ApodToUser";

-- AddForeignKey
ALTER TABLE "Apod" ADD CONSTRAINT "Apod_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
