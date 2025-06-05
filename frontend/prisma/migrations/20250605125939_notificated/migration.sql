-- AlterTable
ALTER TABLE "Monitor" ALTER COLUMN "status" SET DEFAULT 'CHECKING';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isEmail" BOOLEAN DEFAULT false,
ADD COLUMN     "isTelegram" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT;
