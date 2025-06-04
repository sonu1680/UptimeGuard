import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const monitorId = searchParams.get("monitorid");
  const res = await tryCatchHandler(() =>
    prisma.monitor.findFirst({
      where: {
        monitorId: monitorId!,
      },
      include: {
       alertLogs:true,
       notification:true,
       responseLog:true
      },
    })
  );
  return responseHandler(res, "Monitoring website Details", "User not found", 200, 404, res);
}
