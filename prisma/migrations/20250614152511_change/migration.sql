/*
  Warnings:

  - The primary key for the `subscribe_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `tx_id` on the `subscribe_data` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.
  - The primary key for the `subscriber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `sub_id` on the `subscriber` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `subscribe_data` DROP PRIMARY KEY,
    MODIFY `tx_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tx_id`);

-- AlterTable
ALTER TABLE `subscriber` DROP PRIMARY KEY,
    MODIFY `sub_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sub_id`);
