import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-around px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Job Quest logo" />
          <span className="text-xl font-bold tracking-tight">Job Quest</span>
        </Link>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
          <AuthButton loggedIn={!!session} />
        </div>
      </nav>
    </header>
  );
}
