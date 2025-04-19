/*
  Warnings:

  - Added the required column `productId` to the `varient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `varient` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `varient` ADD CONSTRAINT `varient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
