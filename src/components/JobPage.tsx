import { formatMoney } from "@/lib/utils";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import { JobWithCompany, UserWithCompanies } from "@/lib/prisma";
import FollowButton from "./FollowButton";

interface JobPageProps {
  job: JobWithCompany;
  user: UserWithCompanies | undefined;
}

export default function JobPage({ job, user }: JobPageProps) {
  const {
    title,
    description,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    company,
  } = job;

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {company.logoUrl && (
          <Image
            src={company.logoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  target="_blank"
                  className="text-green-500 hover:underline"
                >
                  {company.name}
                </Link>
              ) : (
                <span>{company.name}</span>
              )}
              {user && <FollowButton company={company} user={user} />}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
