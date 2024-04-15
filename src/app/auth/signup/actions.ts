"use server";

import { createCompanySchema } from "@/lib/validation";
import { hash } from "bcrypt";
import path from "path";
import { put } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCompany(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parse = createCompanySchema.safeParse(values);

  if (!parse.success) {
    throw new Error("Invalid Data");
  }

  const { name, email, password, url, logo } = parse.data;

  const existingCompanyEmail = await prisma.company.findUnique({
    where: { email: email },
  });

  if (existingCompanyEmail) {
    throw Error("Company email already exists.");
  }

  let companyLogoUrl: string | undefined = undefined;

  if (logo) {
    const slug = `${toSlug(name)}-${nanoid(10)}`;
    const blob = await put(
      `company_logos/${slug}${path.extname(logo.name)}`,
      logo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  const hashedPassword = await hash(password, 10);

  await prisma.company.create({
    data: {
      email,
      name,
      password: hashedPassword,
      logoUrl: companyLogoUrl,
      url,
    },
  });

  redirect("/auth/login");
}
