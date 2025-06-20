import { alertMethod, websites } from "../types";
import { prisma } from "./prisma";
import { sendMail } from "./sendMail";
import { sendToTelegram } from "./sendTelegram";
import { tryCatchHandler } from "./tryCathHandler";
const MESSAGE =
  "Alert: Your website is currently down. Please investigate as soon as possible.";
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
        const response = await sendMail(alertMode.data[0].emailId, MESSAGE);
        if(response==200){
            await tryCatchHandler(() =>
              prisma.alertLog.create({
                data: {
                  monitorId: data.monitorId,
                  sentAt: new Date(),
                  msg: MESSAGE,
                  alertType: "EMAIL",
                  errorMsg: data.error || "",
                  responseCode: data.responseCode || "",
                  responseTime: data.responseTime || "",
                  status: data.status || "offline",
                },
              })
            );
            //console.log("alert sent to mail");

        }
     
      } 
       if (alertMode.data[0].telegramId) {
       const response= await sendToTelegram(alertMode.data[0].telegramId, MESSAGE);
       if (response == 200) {
         await tryCatchHandler(() =>
           prisma.alertLog.create({
             data: {
               monitorId: data.monitorId,
               sentAt: new Date(),
               msg: MESSAGE,
               alertType: "TELEGRAM",
               errorMsg: data.error || "",
               responseCode: data.responseCode || "",
               responseTime: data.responseTime || "",
               status: data.status || "offline",
             },
           })
         );
         //console.log("alert sent to telegram")
       }
      
      }
    }

  }
};
