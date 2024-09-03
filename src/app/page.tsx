import { Appbar } from "@/components/Appbar";
import { Redirect } from "@/components/Redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Zap, Radio } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Appbar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Let Your Fans Choose the Music
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Engage your audience like never before. MusicStreamChoice lets
                  your fans pick the soundtrack to your stream.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="default" className="text-white">
                  Get Started
                </Button>
                <Button variant="outline" className="text-black">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-lg font-bold">Fan Engagement</h3>
                <p className="text-gray-400 mt-2">
                  Boost interaction by letting fans choose the music
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-lg font-bold">Real-time Voting</h3>
                <p className="text-gray-400 mt-2">
                  Instant updates as fans vote for their favorite tracks
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Radio className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-lg font-bold">Seamless Integration</h3>
                <p className="text-gray-400 mt-2">
                  Works with popular streaming platforms and music services
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Revolutionize Your Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join MusicStreamChoice today and start creating unforgettable
                  experiences for your audience.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 text-white border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button variant="outline" className="text-black">
                    Get started
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 hover:text-primary"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          © 2023 MusicStreamChoice. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
