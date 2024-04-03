"use client";

import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton({ loggedIn }: { loggedIn: Boolean }) {
  return loggedIn ? (
    <Button onClick={() => signOut()} variant="destructive">
      Log out
    </Button>
  ) : (
    <Button asChild>
      <Link href="/auth/login">Login</Link>
    </Button>
  );
}
