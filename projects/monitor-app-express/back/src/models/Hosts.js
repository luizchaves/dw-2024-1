import { v4 as uuidv4 } from 'uuid';
import { hosts } from '../database/data.js';

function create({ name, address, id }) {
  id = id ?? uuidv4();

  if (!name || !address) {
    throw new Error('Error when passing parameters');
  }

  const newHost = { name, address, id };

  hosts.push(newHost);

  return newHost;
}

function read(where) {
  if (where) {
    const field = Object.keys(where)[0];

    const value = where[field];

    const filteredHosts = hosts.filter((host) =>
      host[field] instanceof String
        ? host[field].toLowerCase().includes(value.toLowerCase())
        : host[field] === value
    );

    return filteredHosts;
  }

  return hosts;
}

function readById(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new Error('Host not found');
  }

  return hosts[index];
}

function update({ id, name, address }) {
  if (!name || !address || !id) {
    throw new Error('Error when passing parameters');
  }

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new Error('Host not found');
  }

  const newHost = { name, address, id };

  hosts[index] = newHost;

  return newHost;
}

function remove(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new Error('Host not found');
  }

  hosts.splice(index, 1);

  return true;
}

export default { create, read, readById, update, remove };
