import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function DELETE(req: Request) {

  const url=new URL(req.url);
  const id=url.searchParams.get("id")
  const res = await tryCatchHandler(() =>
    prisma.monitor.delete({
      where: {
        monitorId: id!
      },
    })
  );

  return responseHandler(res, "Website Deleted!", "Website not found ", 200, 404, res);
}
