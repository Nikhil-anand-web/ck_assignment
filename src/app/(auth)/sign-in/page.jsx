"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full border p-8 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to your account
        </h2>

        <Button
          onClick={() => {
            signIn("google")
            
          }}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Page;
