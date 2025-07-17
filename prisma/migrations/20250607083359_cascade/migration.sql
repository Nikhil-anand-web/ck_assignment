-- DropForeignKey
ALTER TABLE `varient` DROP FOREIGN KEY `varient_productId_fkey`;

-- DropIndex
DROP INDEX `varient_productId_fkey` ON `varient`;

-- AddForeignKey
ALTER TABLE `varient` ADD CONSTRAINT `varient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
