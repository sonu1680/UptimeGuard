-- CreateEnum
CREATE TYPE "Type" AS ENUM ('EMAIL', 'TELEGRAM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitor" (
    "monitorId" TEXT NOT NULL,
    "websiteName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPaused" BOOLEAN DEFAULT false,
    "checkInterval" TEXT NOT NULL,
    "lastCheckAt" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("monitorId")
);

-- CreateTable
CREATE TABLE "ResponseLog" (
    "id" TEXT NOT NULL,
    "responseTime" TEXT NOT NULL,
    "responseCode" TEXT NOT NULL,
    "checkAt" TIMESTAMP(3) NOT NULL,
    "monitorId" TEXT NOT NULL,

    CONSTRAINT "ResponseLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertLog" (
    "id" TEXT NOT NULL,
    "msg" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "monitorId" TEXT NOT NULL,

    CONSTRAINT "AlertLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'EMAIL',
    "emailId" TEXT,
    "telegramID" TEXT,
    "monitorId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_monitorId_key" ON "Monitor"("monitorId");

-- AddForeignKey
ALTER TABLE "Monitor" ADD CONSTRAINT "Monitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseLog" ADD CONSTRAINT "ResponseLog_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertLog" ADD CONSTRAINT "AlertLog_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("monitorId") ON DELETE RESTRICT ON UPDATE CASCADE;
