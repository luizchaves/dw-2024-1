import prisma from '../database/database.js';

async function read() {
  const tags = await prisma.tag.findMany();

  return tags;
}

export default { read };
