import { prisma } from "@/lib/prisma";
import { RedisManager } from "@/lib/redisManager/redisManager";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const interval: string = searchParams.get("interval") || "1";
  const redisManager = new RedisManager();
  const res = await tryCatchHandler(() =>
    prisma.monitor.findMany({
      where: {
        checkInterval: interval,
      },
    })
  );

  if (res.data) {
    res.data.forEach(async (e) => {
      const a = await RedisManager.getInstance().sendAndAwait(
        e.monitorId,
        e.url
      );
      console.log(a);
    });
  }

  return responseHandler(res, "websiteList", "no website found", 200, 500, res);
}
