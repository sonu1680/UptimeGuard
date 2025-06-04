import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId: string = searchParams.get("userid")!;
  const res = await tryCatchHandler(() =>
    prisma.user.findMany({
      where: {
        id: userId,
      },
     
      include:{
        monitor:true,
        
      }
    })
  );

 

  return responseHandler(res, "websiteList", "no website found", 200, 500, res);
}
