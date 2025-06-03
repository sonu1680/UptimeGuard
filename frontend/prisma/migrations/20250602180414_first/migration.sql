/*
  Warnings:

  - You are about to drop the column `telegramID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "telegramID",
DROP COLUMN "type",
ADD COLUMN     "telegramId" TEXT;

-- DropEnum
DROP TYPE "Type";
