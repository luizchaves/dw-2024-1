import express from 'express';
import Host from './models/Hosts.js';
import Ping from './models/Pings.js';
import Tag from './models/Tags.js';
import { ping } from './lib/ping.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', async (req, res) => {
  const { name, address, tags } = req.body;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const createdHost = await Host.create({ name, address, tags });

    return res.status(201).json(createdHost);
  } catch (error) {
    throw new HttpError('Unable to create a host');
  }
});

router.get('/hosts', async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filteredHosts = await Host.read({ name });

      return res.json(filteredHosts);
    }

    const hosts = await Host.read();

    return res.json(hosts);
  } catch (error) {
    throw new HttpError('Unable to read hosts');
  }
});

router.get('/hosts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const host = await Host.readById(id);

    if (host) {
      return res.json(host);
    } else {
      throw new HttpError('Host not found');
    }
  } catch (error) {
    throw new HttpError('Unable to read a host');
  }
});

router.put('/hosts/:id', async (req, res) => {
  const { name, address, tags } = req.body;

  const { id } = req.params;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const updatedHost = await Host.update({ id, name, address, tags });

    return res.json(updatedHost);
  } catch (error) {
    throw new HttpError('Unable to update a host');
  }
});

router.delete('/hosts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Host.remove(id);

    return res.sendStatus(204);
  } catch (error) {
    throw new HttpError('Unable to delete a host');
  }
});

router.post('/hosts/:hostId/pings/:count', async (req, res) => {
  const { hostId, count } = req.params;

  try {
    const host = await Host.readById(hostId);

    const pingResult = await ping(host.address, count);

    const createdPing = await Ping.create({ ...pingResult, host });

    return res.json(createdPing);
  } catch (error) {
    throw new HttpError('Unable to create a ping for a host');
  }
});

router.get('/hosts/:hostId/pings', async (req, res) => {
  const { hostId: id } = req.params;

  try {
    const pings = await Ping.read({ host: { id } });

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings by host');
  }
});

router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.read();

    return res.json(tags);
  } catch (error) {
    throw new HttpError('Unable to read tags');
  }
});

router.get('/tags/:tag/hosts', async (req, res) => {
  const { tag } = req.params;

  try {
    const host = await Host.read({ tags: tag });

    return res.json(host);
  } catch (error) {
    throw new HttpError('Unable to read hosts by tag');
  }
});

router.get('/pings', async (req, res) => {
  try {
    const pings = await Ping.read();

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings');
  }
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
