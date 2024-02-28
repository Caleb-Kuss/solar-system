/*
  Warnings:

  - The primary key for the `Apod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `favoritedById` on the `Apod` table. All the data in the column will be lost.
  - The primary key for the `Epic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `favoritedById` on the `Epic` table. All the data in the column will be lost.
  - The primary key for the `MarsRoverData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `favoritedById` on the `MarsRoverData` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Apod" DROP CONSTRAINT "Apod_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "Epic" DROP CONSTRAINT "Epic_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "MarsRoverData" DROP CONSTRAINT "MarsRoverData_favoritedById_fkey";

-- AlterTable
ALTER TABLE "Apod" DROP CONSTRAINT "Apod_pkey",
DROP COLUMN "favoritedById",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Apod_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Apod_id_seq";

-- AlterTable
ALTER TABLE "Epic" DROP CONSTRAINT "Epic_pkey",
DROP COLUMN "favoritedById",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Epic_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Epic_id_seq";

-- AlterTable
ALTER TABLE "MarsRoverData" DROP CONSTRAINT "MarsRoverData_pkey",
DROP COLUMN "favoritedById",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MarsRoverData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MarsRoverData_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "FavoriteApod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "apodId" TEXT NOT NULL,

    CONSTRAINT "FavoriteApod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteApod" ADD CONSTRAINT "FavoriteApod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteApod" ADD CONSTRAINT "FavoriteApod_apodId_fkey" FOREIGN KEY ("apodId") REFERENCES "Apod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
