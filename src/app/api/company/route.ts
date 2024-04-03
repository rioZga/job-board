import { createCompanySchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import path from "path";
import { put } from "@vercel/blob";
import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = createCompanySchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json({ message: "Invalid Data!" }, { status: 400 });
    }

    const { name, email, password, url, logo } = parse.data;

    const existingCompanyEmail = await prisma.company.findUnique({
      where: { email: email },
    });

    if (existingCompanyEmail) {
      return NextResponse.json(
        { message: "Company email already exists." },
        { status: 409 },
      );
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

    const newCompany = await prisma.company.create({
      data: {
        email,
        name,
        password: hashedPassword,
        logoUrl: companyLogoUrl,
        url,
      },
    });

    return NextResponse.json(
      { company: newCompany, message: "Company created successfully." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong! Try again later." },
      { status: 500 },
    );
  }
}
