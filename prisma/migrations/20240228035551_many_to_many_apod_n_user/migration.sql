/*
  Warnings:

  - You are about to drop the column `favoritedById` on the `Apod` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Apod" DROP CONSTRAINT "Apod_favoritedById_fkey";

-- AlterTable
ALTER TABLE "Apod" DROP COLUMN "favoritedById";

-- CreateTable
CREATE TABLE "_ApodToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApodToUser_AB_unique" ON "_ApodToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ApodToUser_B_index" ON "_ApodToUser"("B");

-- AddForeignKey
ALTER TABLE "_ApodToUser" ADD CONSTRAINT "_ApodToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Apod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApodToUser" ADD CONSTRAINT "_ApodToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
