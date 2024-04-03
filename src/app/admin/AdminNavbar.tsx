"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        {/* <div className="space-x-2">
          <span className="font-semibold">
            Logged in user
          </span>
          <button onClick={handleSignOut} className="underline">
            Log out
          </button>
        </div> */}
      </div>
    </div>
  );
}
