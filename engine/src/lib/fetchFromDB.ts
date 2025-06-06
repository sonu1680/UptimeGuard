import { prisma } from "./prisma";
import { RedisManager } from "./RedisManager";
import { tryCatchHandler } from "./tryCatchHandler";


export const fetchFromDB=async(interval:string)=>{
    const res = await tryCatchHandler(() =>
      prisma.monitor.findMany({
        where: {
          checkInterval: interval,
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
}