/*
  Warnings:

  - A unique constraint covering the columns `[destinationId]` on the table `Traject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationId` to the `Traject` table without a default value. This is not possible if the table is not empty.
  - Made the column `boatId` on table `Traject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Traject` DROP FOREIGN KEY `Traject_boatId_fkey`;

-- AlterTable
ALTER TABLE `Traject` ADD COLUMN `destinationId` INTEGER NOT NULL,
    MODIFY `boatId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Traject_destinationId_key` ON `Traject`(`destinationId`);

-- AddForeignKey
ALTER TABLE `Traject` ADD CONSTRAINT `Traject_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Coordinates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traject` ADD CONSTRAINT `Traject_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
