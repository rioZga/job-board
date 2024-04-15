import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import webPush, { PushSubscription } from "web-push";
import { Job } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const job: Job = await req.json();

    if (!job || !job.companyId) {
      return NextResponse.json(
        { error: "No company Id in body" },
        { status: 400 },
      );
    }

    const company = await prisma.company.findUnique({
      where: { id: job.companyId },
      include: { users: true },
    });

    if (!company) {
      return NextResponse.json({ error: "No company found" }, { status: 404 });
    }

    const pushPromises = company.users.map((user) => {
      if (!user.subscription) return;
      return webPush.sendNotification(
        user.subscription as unknown as PushSubscription,
        JSON.stringify({
          title: `${company.name} has just posted a new job`,
          body: `${job.title}`,
          icon: company.logoUrl,
          data: {
            companyId: company.id,
            slug: job.slug,
          },
        }),
        {
          vapidDetails: {
            subject: "mailto:rioelkamel@gmail.com",
            publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string,
            privateKey: process.env.WEB_PUSH_PRIVATE_KEY as string,
          },
        },
      );
    });

    await Promise.all(pushPromises);

    return NextResponse.json(
      { error: "Push notification succeeded" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Internal server error, ${error}` },
      { status: 500 },
    );
  }
}
