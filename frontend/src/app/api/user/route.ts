import { prisma } from "@/lib/prisma";
import { responseHandler } from "@/lib/responseHandler";
import { tryCatchHandler } from "@/lib/tryCatchHandler";

export async function POST (req: Request) {
  const { name, email } = await req.json();
  const res = await tryCatchHandler(()=>
    prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    })
  );
  return responseHandler(res,"user created","something went wrong",201,500)

}
