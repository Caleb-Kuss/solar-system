-- DropForeignKey
ALTER TABLE "Apod" DROP CONSTRAINT "Apod_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "Epic" DROP CONSTRAINT "Epic_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "MarsRoverData" DROP CONSTRAINT "MarsRoverData_favoritedById_fkey";

-- AlterTable
ALTER TABLE "Apod" ALTER COLUMN "favoritedById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Epic" ALTER COLUMN "favoritedById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MarsRoverData" ALTER COLUMN "favoritedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Apod" ADD CONSTRAINT "Apod_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Epic" ADD CONSTRAINT "Epic_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarsRoverData" ADD CONSTRAINT "MarsRoverData_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
