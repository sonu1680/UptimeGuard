import { alertMethod, websites } from "../types";
import { prisma } from "./prisma";
import { sendMail } from "./sendMail";
import { sendToTelegram } from "./sendTelegram";
import { tryCatchHandler } from "./tryCathHandler";

export const alertHandler = async (data: websites) => {
  if (data) {
    const alertMode = await tryCatchHandler(() =>
      prisma.notification.findMany({
        where: {
          monitorId: data.monitorId,
        },
      })
    );

    if (alertMode.data) {
      if (alertMode.data[0].emailId) {
        const response = await sendMail(alertMode.data[0].emailId);
        if(response==200){
            await tryCatchHandler(() =>
              prisma.alertLog.create({
                data: {
                  monitorId: data.monitorId,
                  sentAt: new Date(),
                  msg: "sx",
                  alertType:"Email" ,
                },
              })
            );
        }
     
      } 
       if (alertMode.data[0].telegramId) {
        console.log(alertMode.data[0].telegramId);
        await sendToTelegram(alertMode.data[0].telegramId);
      }
    }

  }
};
