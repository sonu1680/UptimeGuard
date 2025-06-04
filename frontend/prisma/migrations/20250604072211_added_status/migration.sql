/*
  Warnings:

  - Added the required column `responseTime` to the `Monitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Monitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Monitor" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "responseTime" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "uptime" TEXT NOT NULL DEFAULT '100';
