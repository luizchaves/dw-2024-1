import express from 'express';
import Host from './models/Hosts.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const createdHost = await Host.create({ name, address });

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
  const { name, address } = req.body;

  const id = req.params.id;

  if (!name || !address) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const updatedHost = await Host.update({ id, name, address });

    return res.json(updatedHost);
  } catch (error) {
    throw new HttpError('Unable to update a host');
  }
});

router.delete('/hosts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Host.remove(id);

    return res.send(204);
  } catch (error) {
    throw new HttpError('Unable to delete a host');
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
