import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function POST(req: Request) {
  const data = await req.json();

  const res = await tryCatchHandler(async () => {
    const monitor = await prisma.monitor.update({
      where: {
        monitorId: data.monitorId!,
      },
      data: {
        isPaused: data.isPaused,
        websiteName: data.websiteName,
      },
    });

    const existingNotification = await prisma.notification.findFirst({
      where: { monitorId: data.monitorId },
    });

    if (existingNotification) {
      await prisma.notification.update({
        where: { id: existingNotification.id },
        data: {
          emailId: data.emailId,
          telegramId: data.telegramId,
        },
      });
    } else {
      await prisma.notification.create({
        data: {
          monitorId: data.monitorId,
          emailId: data.emailId,
          telegramId: data.telegramId,
        },
      });
    }

    return monitor;
  });

  return responseHandler(
    res,
    "Data updated successfully",
    "Internal server error",
    200,
    500,
    res
  );
}
