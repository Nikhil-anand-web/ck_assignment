/*
  Warnings:

  - You are about to drop the column `size` on the `varient` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `varient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `varient` DROP COLUMN `size`,
    DROP COLUMN `weight`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `validity` INTEGER NOT NULL DEFAULT 30;
