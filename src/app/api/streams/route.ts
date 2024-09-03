import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";
import { getServerSession } from "next-auth";

const YT_REGEX = new RegExp(
  "^(https?://)?(www.)?(youtube.com|youtu.be)/(watch?v=|embed/|v/|.+?v=)?([a-zA-Z0-9_-]{11})$",
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);
    if (!isYt) {
      return NextResponse.json(
        { message: "Invalid youtube url" },
        { status: 411 },
      );
    }

    const extractedId = data.url.split("/watch?v=")[1];

    const videoDetails = await youtubesearchapi.GetVideoDetails(extractedId);

    const thumbnails = videoDetails.thumbnail.thumbnails;
    console.log(thumbnails);

    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1,
    );

    const stream = await prismaClient.streams.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        type: "Youtube",
        title: videoDetails.title,
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ?? "",
        bigImg: thumbnails[thumbnails.length - 1].url ?? "",
      },
    });

    return NextResponse.json({ message: "Stream created", id: stream.id });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Error while adding a stream" },
      { status: 411 },
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  const creatorId = user?.id;
  const streams = await prismaClient.streams.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json(streams);
}
