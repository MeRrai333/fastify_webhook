/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `subscriber_url_key` ON `subscriber`(`url`);
