"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData, companyId: string) {
  const values = Object.fromEntries(formData.entries());
  const {
    title,
    type,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  const job = await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: true,
      company: {
        connect: {
          id: companyId,
        },
      },
    },
  });

  fetch("http://localhost:3000/api/push-webhook", {
    method: "POST",
    body: JSON.stringify(job),
  });

  redirect("/job-submitted");
}
