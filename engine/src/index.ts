import { CronJob } from "cron";
import { tryCatchHandler } from "./lib/tryCatchHandler";
import { prisma } from "./lib/prisma";
import { RedisManager } from "./lib/RedisManager";

const job = new CronJob("*/2 * * * * *", async () => {
  const res = await tryCatchHandler(() =>
    prisma.monitor.findMany({
      where: {
        checkInterval: "2",
      },
      select: {
        url: true,
        monitorId: true,
        checkInterval: true,
      },
    })
  );

  if (res.data) {
     RedisManager.getInstance().sendToWorker(res.data);
  } else {
    console.error("Failed to fetch monitors or none found.");
  }
});

job.start();
