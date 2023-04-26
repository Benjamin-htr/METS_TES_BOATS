/*
  Warnings:

  - You are about to drop the column `trajectId` on the `Speed` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Speed` DROP FOREIGN KEY `Speed_trajectId_fkey`;

-- AlterTable
ALTER TABLE `Speed` DROP COLUMN `trajectId`,
    ADD COLUMN `boatId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Speed` ADD CONSTRAINT `Speed_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
