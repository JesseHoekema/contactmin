import pkg from '@prisma/client';
const { PrismaClient } = pkg;

declare global {
  var prisma: InstanceType<typeof PrismaClient> | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export { prisma };
