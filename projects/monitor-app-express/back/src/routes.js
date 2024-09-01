import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hosts } from './data/hosts.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  const id = uuidv4();

  const newHost = { id, name, address };

  hosts.push(newHost);

  res.status(201).json(newHost);
});

router.get('/hosts', (req, res) => {
  const where = req.query;

  if (where) {
    const field = Object.keys(where)[0];

    const value = where[field];

    const filteredHosts = hosts.filter((host) =>
      host[field] instanceof String
        ? host[field].toLowerCase().includes(value.toLowerCase())
        : host[field] === value
    );

    return res.json(filteredHosts);
  }

  return res.json(hosts);
});

router.get('/hosts/:id', (req, res) => {
  const { id } = req.params;

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HttpError('Unable to read a host');
  }

  return res.json(hosts[index]);
});

router.put('/hosts/:id', (req, res) => {
  const { name, address } = req.body;

  const { id } = req.params;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  const newHost = { id, name, address };

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HttpError('Unable to update a host');
  }

  hosts[index] = newHost;

  return res.json(newHost);
});

router.delete('/hosts/:id', (req, res) => {
  const { id } = req.params;

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HttpError('Unable to delete a host');
  }

  hosts.splice(index, 1);

  return res.send(204);
});

// 404 handler
router.use((req, res, next) => {
  return res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  // console.error(err.message);
  console.error(err.stack);

  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }

  // next(err);
  return res.status(500).json({ message: 'Something broke!' });
});

export default router;
