/*
  Warnings:

  - You are about to drop the column `trajectId` on the `Coordinates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[boatId]` on the table `Coordinates` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Coordinates` DROP FOREIGN KEY `Coordinates_trajectId_fkey`;

-- AlterTable
ALTER TABLE `Boat` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Coordinates` DROP COLUMN `trajectId`,
    ADD COLUMN `boatId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Coordinates_boatId_key` ON `Coordinates`(`boatId`);

-- AddForeignKey
ALTER TABLE `Boat` ADD CONSTRAINT `Boat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordinates` ADD CONSTRAINT `Coordinates_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
