-- AlterTable
ALTER TABLE "Monitor" ALTER COLUMN "responseTime" SET DEFAULT '0',
ALTER COLUMN "status" DROP NOT NULL;
