import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 411 });
  }

  try {
    const data = UpvoteSchema.parse(await req.json());
    await prismaClient.upVotes.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({ message: "Upvote added" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error while adding a upvote" },
      { status: 411 },
    );
  }
}
