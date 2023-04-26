/*
  Warnings:

  - Made the column `userId` on table `Boat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Boat` DROP FOREIGN KEY `Boat_userId_fkey`;

-- AlterTable
ALTER TABLE `Boat` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Boat` ADD CONSTRAINT `Boat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
