"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MainModule() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <main  style={{width:"80vw"}} className="flex-1 p-8 ">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src={user.image || "/default-avatar.png"}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Button onClick={() => signOut()} className="mt-6 w-full">
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
}
