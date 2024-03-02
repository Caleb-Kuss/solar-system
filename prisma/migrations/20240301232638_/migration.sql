-- CreateTable
CREATE TABLE "FavoriteEpic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "epicId" TEXT NOT NULL,

    CONSTRAINT "FavoriteEpic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteMarsRoverData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marsRoverDataId" TEXT NOT NULL,

    CONSTRAINT "FavoriteMarsRoverData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteEpic" ADD CONSTRAINT "FavoriteEpic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEpic" ADD CONSTRAINT "FavoriteEpic_epicId_fkey" FOREIGN KEY ("epicId") REFERENCES "Epic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteMarsRoverData" ADD CONSTRAINT "FavoriteMarsRoverData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteMarsRoverData" ADD CONSTRAINT "FavoriteMarsRoverData_marsRoverDataId_fkey" FOREIGN KEY ("marsRoverDataId") REFERENCES "MarsRoverData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
