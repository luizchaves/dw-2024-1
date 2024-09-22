import bcrypt from 'bcrypt';
import prisma from '../database/database.js';

const saltRounds = Number(process.env.BCRYPT_SALT);

async function create({ name, email, password }) {
  const hash = await bcrypt.hash(password, saltRounds);

  const data = { name, email, password: hash };

  const createdUser = await prisma.user.create({
    data,
  });

  return createdUser;
}

async function read(where) {
  const users = await prisma.user.findMany({
    where,
  });

  if (users.length === 1 && where) {
    return users[0];
  }

  return users;
}

async function readById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function update({ id, name, email, password }) {
  const hash = await bcrypt.hash(password, saltRounds);

  const data = { name, email, password: hash };

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
}

async function remove(id) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export default { create, read, readById, update, remove };
