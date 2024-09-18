import prisma from '../database/database.js';

async function create({ name, address }) {
  const createdHost = await prisma.host.create({
    data: { name, address },
  });

  return createdHost;
}

async function read(where) {
  if (where?.name) {
    where.name = {
      contains: where.name,
    };
  }

  const hosts = await prisma.host.findMany({ where });

  if (hosts.length === 1 && where) {
    return hosts[0];
  }

  return hosts;
}

async function readById(id) {
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  return host;
}

async function update({ id, name, address }) {
  const updatedHost = await prisma.host.update({
    where: {
      id,
    },
    data: { name, address },
  });

  return updatedHost;
}

async function remove(id) {
  await prisma.host.delete({
    where: {
      id,
    },
  });
}

export default { create, read, readById, update, remove };
