/*
  Warnings:

  - Added the required column `kilometers` to the `Traject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Traject` ADD COLUMN `kilometers` DOUBLE NOT NULL;
