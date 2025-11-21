export const prisma: any = new Proxy({}, {
  get() {
    throw new Error('Prisma client is not included in this build.');
  },
});
