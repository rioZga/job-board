import { Metadata } from "next";
import NewJobForm from "./NewJobForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import H1 from "@/components/ui/h1";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default async function page() {
  const session = await getServerSession(options);
  if (!session?.user || session.user.role !== "company") {
    return (
      <main className="m-auto my-10 max-w-3xl space-y-10">
        <div className="space-y-5 text-center">
          <H1>Unauthorized</H1>
          <p className="text-muted-foreground">
            Only companies are allowed to post jobs.
          </p>
        </div>
      </main>
    );
  }
  return <NewJobForm companyId={session.user.id} />;
}
