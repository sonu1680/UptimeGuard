/*
  Warnings:

  - The `lastCheckAt` column on the `Monitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "AlertLog" DROP CONSTRAINT "AlertLog_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "Monitor" DROP CONSTRAINT "Monitor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "ResponseLog" DROP CONSTRAINT "ResponseLog_monitorId_fkey";

-- AlterTable
ALTER TABLE "Monitor" DROP COLUMN "lastCheckAt",
ADD COLUMN     "lastCheckAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseLog" ADD CONSTRAINT "ResponseLog_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertLog" ADD CONSTRAINT "AlertLog_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE CASCADE ON UPDATE CASCADE;
