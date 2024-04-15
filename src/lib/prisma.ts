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

export type JobWithCompanyWithUsers = Prisma.JobGetPayload<{
  include: { company: { include: { users: true } } };
}>;

export type UserWithCompanies = Prisma.UserGetPayload<{
  include: { companies: true };
}>;

export type CompanyWithUsers = Prisma.CompanyGetPayload<{
  include: { users: true };
}>;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
