import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { z } from "zod";

const CreateCreatorSchema = z.object({
  email: z.string(),
});

export async function GET(req: NextRequest) {
  const { email } = CreateCreatorSchema.parse(await req.json());
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  const creatorId = user?.id;

  return NextResponse.json({ creatorId });
}
