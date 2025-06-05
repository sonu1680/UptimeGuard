import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";


 type sonu={
monitorId:string,
emailId:string,
telegramId:string,
isEmail:boolean,
isTelegram:boolean,
websiteName:string,
url:string,
interval:string,


 }
export async function POST(req: Request) {
  const data:sonu = await req.json();
  console.log(data)
  const res = await tryCatchHandler(() =>
    prisma.monitor.update({
      where: {
        monitorId: data.monitorId,
      },
      data: {
        websiteName: data.websiteName,
        url: data.url,
        checkInterval: data.interval,
        notification: {
          upsert: {
            update: {
              emailId: data.emailId,
              telegramId: data.telegramId,
              isEmail: data.isEmail || !!data.emailId,
              isTelegram: data.isTelegram || !!data.telegramId,
            },
            create: {
              emailId: data.emailId,
              telegramId: data.telegramId,
              isEmail: data.isEmail || !!data.emailId,
              isTelegram: data.isTelegram || !!data.telegramId,
            },
          },
        },
      },
    })
  );
  
  return responseHandler(
    res,
    "Data updated successfully",
    "Internal server error",
    200,
    500,
    res
  );
}
