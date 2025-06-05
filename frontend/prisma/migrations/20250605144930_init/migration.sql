/*
  Warnings:

  - A unique constraint covering the columns `[monitorId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Made the column `isEmail` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isTelegram` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Monitor_monitorId_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "isEmail" SET NOT NULL,
ALTER COLUMN "isTelegram" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_monitorId_key" ON "Notification"("monitorId");
