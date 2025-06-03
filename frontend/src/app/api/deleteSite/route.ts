import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function DELETE(req: Request) {
  const data = await req.json();

  const res = await tryCatchHandler(() =>
    prisma.monitor.delete({
      where: {
        monitorId: data.monitorId,
      },
    })
  );

  return responseHandler(res, "Website Deleted!", "Website not found ", 200, 404, res);
}
