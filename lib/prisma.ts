import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

if (process.env.NODE_ENV !== 'production') {
  const masked = connectionString.replace(/:[^:@/]+@/, ':****@');
  console.log(`[prisma] Using connection string: ${masked}`);
}

// Configure WebSocket for Neon serverless
neonConfig.webSocketConstructor = ws;

// Create adapter with pool config (PrismaNeon creates the pool internally)
const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
