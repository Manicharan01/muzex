import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  console.log(user);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 411 });
  }

  const streams = await prismaClient.streams.findMany({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          upVotes: true,
        },
      },
    },
  });

  return NextResponse.json({
    streams: streams.map(({ _count, ...stream }) => ({
      ...stream,
      upVotes: _count.upVotes,
    })),
  });
}
