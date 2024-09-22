import prisma from '../database/database.js';

async function create({ packets: icmps, statistics: stats, host, userId }) {
  if (!icmps || !stats || !host || !userId) {
    throw new Error('Error when passing parameters');
  }

  const { transmitted, received } = stats;

  const createdPing = await prisma.ping.create({
    data: {
      icmps: {
        create: icmps,
      },
      stats: {
        create: { transmitted, received },
      },
      host: {
        connect: {
          id: host.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      icmps: true,
      stats: true,
      host: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return createdPing;
}

async function read(where = {}) {
  const pings = await prisma.ping.findMany({
    where,
    include: {
      icmps: true,
      stats: true,
      host: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return pings;
}

export default { create, read };
