"use server";

import prisma from "@/lib/prisma";

export async function onFollowCompany(userId: string, companyId: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      companies: {
        connect: {
          id: companyId,
        },
      },
    },
  });
}

export async function onUnfollowCompany(userId: string, companyId: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      companies: {
        disconnect: {
          id: companyId,
        },
      },
    },
  });
}
