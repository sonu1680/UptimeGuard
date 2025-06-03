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
                },
            })
        );
        const lastCheckAts = await tryCatchHandler(() =>
          prisma.monitor.update({
            where: {
              monitorId: site.monitorId,
            },
            data: {
              lastCheckAt:new Date()
            },
          })
        );
        

    }
  }
};
