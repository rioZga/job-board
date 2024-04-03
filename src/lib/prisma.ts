import { PrismaClient, Prisma } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

export type JobWithCompany = Prisma.JobGetPayload<{
  include: { company: true };
}>;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
