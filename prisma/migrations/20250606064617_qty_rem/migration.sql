/*
  Warnings:

  - You are about to drop the column `qty` on the `varient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `pointsDescription` JSON NULL;

-- AlterTable
ALTER TABLE `varient` DROP COLUMN `qty`;
