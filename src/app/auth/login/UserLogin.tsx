"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import google from "@/assets/google.svg";
import github from "@/assets/github.svg";
import Image from "next/image";

export default function UserLogin() {
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="flex flex-col items-center space-y-6 rounded-lg border p-4">
        <Button
          onClick={() => signIn("google")}
          className="flex min-w-96 gap-5"
        >
          <Image src={google} width={21} height={21} alt="google icon" />
          Sign in with Google.
        </Button>
        <Button
          onClick={() => signIn("github")}
          className="flex min-w-96 gap-5"
        >
          <Image src={github} width={21} height={21} alt="github icon" />
          Sign in with Github.
        </Button>
      </div>
    </main>
  );
}
