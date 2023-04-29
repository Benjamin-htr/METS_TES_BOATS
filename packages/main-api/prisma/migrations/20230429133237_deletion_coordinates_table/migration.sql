/*
  Warnings:

  - You are about to drop the column `coordinatesId` on the `Boat` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId` on the `Traject` table. All the data in the column will be lost.
  - You are about to drop the `Coordinates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Boat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Boat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Traject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Traject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Boat` DROP FOREIGN KEY `Boat_coordinatesId_fkey`;

-- DropForeignKey
ALTER TABLE `Traject` DROP FOREIGN KEY `Traject_destinationId_fkey`;

-- AlterTable
ALTER TABLE `Boat` DROP COLUMN `coordinatesId`,
    ADD COLUMN `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Traject` DROP COLUMN `destinationId`,
    ADD COLUMN `finishedDate` DATETIME(3) NULL,
    ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `Coordinates`;
