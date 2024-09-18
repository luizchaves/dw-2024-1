import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const file = resolve('prisma', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));

  for (const host of seed.hosts) {
    await prisma.host.create({
      data: host,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
