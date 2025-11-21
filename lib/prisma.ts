import type { PrismaClient } from '@prisma/client';

const placeholder: PrismaClient = new Proxy({}, {
  get() {
    throw new Error('Prisma client is disabled in this build.');
  },
}) as PrismaClient;

export const prisma = placeholder;
