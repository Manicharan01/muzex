"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Appbar() {
  const session = useSession();

  return (
    <div className="flex justify-between p-8">
      <div className="ml-2 text-lg font-bold flex flex-col justify-center">
        Muzex
      </div>
      <div>
        {session.data?.user && (
          <Button
            variant="outline"
            className="text-black"
            onClick={() => {
              signOut();
            }}
          >
            Log Out
          </Button>
        )}
        {!session.data?.user && (
          <Button
            variant="outline"
            className="text-black"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
