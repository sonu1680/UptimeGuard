/*
  Warnings:

  - Added the required column `errorMsg` to the `AlertLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseCode` to the `AlertLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseTime` to the `AlertLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `AlertLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertLog" ADD COLUMN     "errorMsg" TEXT NOT NULL,
ADD COLUMN     "responseCode" TEXT NOT NULL,
ADD COLUMN     "responseTime" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
