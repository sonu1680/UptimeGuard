import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";
import { MonitorApi } from "@/lib/types";

export async function POST(req: Request) {
  const data = await req.json();
  const {
    userId,
    websiteName,
    url,
    checkInterval,
    emailId,
    telegramId,
  }: MonitorApi = data;
  const res = await tryCatchHandler(() =>
    prisma.monitor.create({
      data: {
        userId,
        websiteName,
        url,
        checkInterval,

        notification: {
          create: {
            emailId: emailId,
            telegramId: telegramId,
          },
        },
      },
    })
  );

return responseHandler(res,"website adde","website add fail",201,500,res);

}
