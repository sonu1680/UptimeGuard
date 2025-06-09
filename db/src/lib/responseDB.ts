import { dataFromEngine } from "../types";
import { prisma } from "./prisma";
import { tryCatchHandler } from "./tryCathHandler";

export const responseDB = async (data: dataFromEngine) => {
  for (const site of data.sites) {
      if(site){
          const res = await tryCatchHandler(() =>
            prisma.responseLog.create({
                data: {
                    monitorId: site.monitorId,
                    responseCode: site.responseCode!,
                    responseTime: site.responseTime!,
                    checkAt: site.checkAt!,
                    status:site.status||"checking"
                    
                },
            })
        );

      
        const [onlineCount, offlineCount] = await Promise.all([
          prisma.responseLog.count({
            where: {monitorId: site.monitorId, status: "online" },
          }),
          prisma.responseLog.count({
            where: {monitorId: site.monitorId, status: "offline" },
          }),
        ]);

        const total = onlineCount + offlineCount;
        const uptime = total > 0 ? (onlineCount / total) * 100 : 0;

         const a = await tryCatchHandler(() =>
           prisma.monitor.update({
             where: {
               monitorId: site.monitorId,
             },
             data: {
               lastCheckAt: new Date(),
               responseTime: site.responseTime,
               uptime: uptime.toFixed(2).toString(),
               status: site.status || "checking",
             },
           })
         );
        

    }
  }
};
