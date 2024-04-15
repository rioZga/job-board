import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const subscription: PushSubscription | undefined = await req.json();
    if (!subscription) {
      return NextResponse.json(
        { error: "Missing push subscription" },
        { status: 400 },
      );
    }

    const session = await getServerSession(options);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscription,
      },
    });

    return NextResponse.json(
      { error: "Push subscription saved" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
