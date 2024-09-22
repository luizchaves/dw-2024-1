import { PrismaClient } from '@prisma/client';
import Host from '../src/models/Hosts.js';
import User from '../src/models/Users.js';

const prisma = new PrismaClient();

async function main() {
  await Host.create({
    name: 'Google DNS',
    address: '8.8.8.8',
    tags: ['DNS', 'Google'],
  });

  await Host.create({
    name: 'Google Search',
    address: 'www.google.com',
    tags: ['Motor de Busca', 'Google'],
  });

  await User.create({
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  });
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
