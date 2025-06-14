-- CreateTable
CREATE TABLE `subscriber` (
    `sub_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `secret` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`sub_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribe_data` (
    `tx_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tx_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriber_subscribe_data_mapping` (
    `mapping_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_id` BIGINT UNSIGNED NOT NULL,
    `tx_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`mapping_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscriber_subscribe_data_mapping` ADD CONSTRAINT `subscriber_subscribe_data_mapping_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subscriber`(`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriber_subscribe_data_mapping` ADD CONSTRAINT `subscriber_subscribe_data_mapping_tx_id_fkey` FOREIGN KEY (`tx_id`) REFERENCES `subscribe_data`(`tx_id`) ON DELETE CASCADE ON UPDATE CASCADE;
