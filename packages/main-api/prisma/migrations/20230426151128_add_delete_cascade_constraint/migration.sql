-- DropForeignKey
ALTER TABLE `Boat` DROP FOREIGN KEY `Boat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Fuel` DROP FOREIGN KEY `Fuel_boatId_fkey`;

-- DropForeignKey
ALTER TABLE `Speed` DROP FOREIGN KEY `Speed_boatId_fkey`;

-- DropForeignKey
ALTER TABLE `Traject` DROP FOREIGN KEY `Traject_boatId_fkey`;

-- DropForeignKey
ALTER TABLE `Traject` DROP FOREIGN KEY `Traject_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Wave` DROP FOREIGN KEY `Wave_trajectId_fkey`;

-- DropForeignKey
ALTER TABLE `Wind` DROP FOREIGN KEY `Wind_trajectId_fkey`;

-- AddForeignKey
ALTER TABLE `Traject` ADD CONSTRAINT `Traject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traject` ADD CONSTRAINT `Traject_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boat` ADD CONSTRAINT `Boat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fuel` ADD CONSTRAINT `Fuel_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Speed` ADD CONSTRAINT `Speed_boatId_fkey` FOREIGN KEY (`boatId`) REFERENCES `Boat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wave` ADD CONSTRAINT `Wave_trajectId_fkey` FOREIGN KEY (`trajectId`) REFERENCES `Traject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wind` ADD CONSTRAINT `Wind_trajectId_fkey` FOREIGN KEY (`trajectId`) REFERENCES `Traject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
