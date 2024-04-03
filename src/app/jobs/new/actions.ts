"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData, companyId: string) {
  const values = Object.fromEntries(formData.entries());
  console.log("in action!");
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

  console.log("after parse");

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  await prisma.job.create({
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
      company: {
        connect: {
          id: companyId,
        },
      },
    },
  });

  redirect("/job-submitted");
}
