import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const monitorId = searchParams.get("monitorid");

  const res = await tryCatchHandler(async () => {
    const monitor = await prisma.monitor.findFirst({
      where: {
        monitorId: monitorId!,
      },
      include: {
        alertLogs: true,
        notification: true,
      },
    });

    if (!monitor) return null;

    const responseLog = await prisma.responseLog.findMany({
      where: {
        monitorId: monitorId!,
      },
      orderBy: {
        checkAt: "desc", 
      },
      take: 80,
    });

    return {
      ...monitor,
      responseLog,
    };
  });

  return responseHandler(
    res,
    "Monitoring website Details",
    "User not found",
    200,
    404,
    res
  );
}
