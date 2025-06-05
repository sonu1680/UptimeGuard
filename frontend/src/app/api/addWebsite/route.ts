import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";
import { MonitorApi } from "@/lib/types";

export async function POST(req: Request) {
  
  const session = await auth();
  let data =await req.json();
  const {
    userId,
    websiteName,
    url,
    checkInterval,
    emailId,
    telegramId,
  }: MonitorApi = data;

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const res = await tryCatchHandler(() =>
    prisma.monitor.create({
      data: {
        userId: session?.user!.id!,
        websiteName: websiteName.trim(),
        url:url.trim(),
        checkInterval:checkInterval.trim(),

        notification: {
          create: {
            emailId: emailId?.trim(),
            telegramId: telegramId?.trim(),
          },
        },
      },
    })
  );
  console.log(res)
return responseHandler(res,"website adde","website add fail",201,500,res);

}
