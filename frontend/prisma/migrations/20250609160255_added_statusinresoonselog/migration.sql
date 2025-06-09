-- AlterTable
ALTER TABLE "Monitor" ALTER COLUMN "status" SET DEFAULT 'checking';

-- AlterTable
ALTER TABLE "ResponseLog" ADD COLUMN     "status" TEXT DEFAULT 'checking';
