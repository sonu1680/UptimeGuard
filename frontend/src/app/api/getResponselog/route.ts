import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userid");
  const res = await tryCatchHandler(() =>
    prisma.user.findFirst({
      where: {
        id: userId!,
      },
      select:{
        monitor:true
      }
    })
  );
  return responseHandler(res, "Monitoring website Details", "User not found", 200, 404, res);
}
