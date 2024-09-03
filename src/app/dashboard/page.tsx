"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { prismaClient } from "@/lib/db";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { creatorIdState } from "@/store/atoms/creator";

interface Video {
  id: string;
  title: string;
  votes: number;
  duration: string;
  artist: string;
  thumbnail: string;
}
const REFRESH_INTERVAL = 10 * 1000;

export default function Component() {
  const session = useSession();
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>();
  const [creatorId, setCreatorId] = useRecoilState(creatorIdState);

  async function getCreatorId() {
    await fetch("api/creator", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.data?.user?.email,
      }),
    }).then((res) => {
      setCreatorId(JSON.stringify(res));
    });
  }

  getCreatorId();

  //async function getStreams() {
  //  await fetch("/api/streams", {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //  }).then((res) => {
  //    console.log(JSON.stringify(res));
  //  });
  //}

  //async function refreshStream() {
  //  await fetch("/api/streams/my", {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //  }).then((res) => {
  //    console.log(JSON.stringify(res));
  //  });
  //}

  //useEffect(() => {
  //  refreshStream();
  //  getStreams();
  //  const interval = setInterval(() => {}, REFRESH_INTERVAL);
  //}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("api/streams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creatorId: creatorId,
        url: inputLink,
      }),
    });
  };

  const handleVote = (id: string, increment: number) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? { ...video, votes: video.votes + increment }
            : video,
        )
        .sort((a, b) => b.votes - a.votes),
    );

    fetch("api/streams/upvote", {});
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0]);
      setQueue(queue.slice(1));
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The page URL has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <div className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Song Voting Queue</h1>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-gray-600 hover:bg-gray-700 hover:text-white text-black"
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
              {currentVideo ? (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={`/placeholder.svg?height=180&width=320&text=${currentVideo.title}`}
                      alt={currentVideo.title}
                      className="w-full md:w-80 h-45 object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {currentVideo.title}
                      </h3>
                      <p className="text-gray-400">{currentVideo.artist}</p>
                      <p className="text-gray-500 mt-2">
                        Duration: {currentVideo.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">No video currently playing</p>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={inputLink}
              onChange={(e) => setInputLink(e.target.value)}
              placeholder="Paste YouTube link here"
              className="flex-grow bg-gray-800 border-gray-700 text-gray-100"
            />
            <Button type="submit" variant="secondary">
              Add to Queue
            </Button>
          </form>

          {inputLink && (
            <Card className="overflow-hidden bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <img
                  src={`/placeholder.svg?height=200&width=356&text=Video%20Preview`}
                  alt="Video preview"
                  className="w-full h-[200px] object-cover"
                />
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-100">Upcoming Songs</h2>
            {queue.map((video) => (
              <Card key={video.id} className="bg-gray-800 border-gray-700">
                <CardContent className="flex items-center gap-4 p-4">
                  <img
                    src={`/placeholder.svg?height=90&width=160&text=${video.title}`}
                    alt={video.title}
                    className="w-40 h-[90px] object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-100">
                      {video.title}
                    </h3>
                    <p className="text-gray-400">{video.artist}</p>
                    <p className="text-gray-500">Duration: {video.duration}</p>
                    <p className="text-gray-400">Votes: {video.votes}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleVote(video.id, 1)}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleVote(video.id, -1)}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={playNext}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100"
          >
            <Play className="mr-2 h-4 w-4" /> Play Next Song
          </Button>
        </div>
      </div>
    </div>
  );
}
