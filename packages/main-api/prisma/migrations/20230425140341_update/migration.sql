/*
  Warnings:

  - You are about to drop the column `boatId` on the `Coordinates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coordinatesId]` on the table `Boat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coordinatesId` to the `Boat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Coordinates` DROP FOREIGN KEY `Coordinates_boatId_fkey`;

-- AlterTable
ALTER TABLE `Boat` ADD COLUMN `coordinatesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Coordinates` DROP COLUMN `boatId`;

-- CreateIndex
CREATE UNIQUE INDEX `Boat_coordinatesId_key` ON `Boat`(`coordinatesId`);

-- AddForeignKey
ALTER TABLE `Boat` ADD CONSTRAINT `Boat_coordinatesId_fkey` FOREIGN KEY (`coordinatesId`) REFERENCES `Coordinates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
