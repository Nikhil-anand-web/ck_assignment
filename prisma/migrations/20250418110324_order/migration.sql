-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `CustomerMeta` JSON NULL,
    `varientIds` JSON NOT NULL,
    `varientMeta` JSON NOT NULL,
    `finalPrice` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `paymentToken` JSON NULL,
    `paymentStatus` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `orders_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
