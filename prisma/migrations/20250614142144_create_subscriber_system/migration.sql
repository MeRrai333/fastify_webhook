/*
  Warnings:

  - You are about to drop the `subscriber_subscribe_data_mapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subscriber_subscribe_data_mapping` DROP FOREIGN KEY `subscriber_subscribe_data_mapping_sub_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscriber_subscribe_data_mapping` DROP FOREIGN KEY `subscriber_subscribe_data_mapping_tx_id_fkey`;

-- DropTable
DROP TABLE `subscriber_subscribe_data_mapping`;
