import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Host from './models/Hosts.js';
import Ping from './models/Pings.js';
import Tag from './models/Tags.js';
import User from './models/Users.js';

import { ping } from './lib/ping.js';

import { isAuthenticated } from './middleware/auth.js';

class HttpError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', isAuthenticated, async (req, res) => {
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

router.get('/hosts', isAuthenticated, async (req, res) => {
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

router.get('/hosts/:id', isAuthenticated, async (req, res) => {
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

router.put('/hosts/:id', isAuthenticated, async (req, res) => {
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

router.delete('/hosts/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await Host.remove(id);

    return res.sendStatus(204);
  } catch (error) {
    throw new HttpError('Unable to delete a host');
  }
});

router.post(
  '/hosts/:hostId/pings/:count',
  isAuthenticated,
  async (req, res) => {
    const { hostId, count } = req.params;

    try {
      const userId = req.userId;

      const host = await Host.readById(hostId);

      const pingResult = await ping(host.address, count);

      const createdPing = await Ping.create({ ...pingResult, host, userId });

      return res.json(createdPing);
    } catch (error) {
      throw new HttpError('Unable to create a ping for a host');
    }
  }
);

router.get('/hosts/:hostId/pings', isAuthenticated, async (req, res) => {
  const { hostId: id } = req.params;

  try {
    const pings = await Ping.read({ host: { id } });

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings by host');
  }
});

router.get('/tags', isAuthenticated, async (req, res) => {
  try {
    const tags = await Tag.read();

    return res.json(tags);
  } catch (error) {
    throw new HttpError('Unable to read tags');
  }
});

router.get('/tags/:tag/hosts', isAuthenticated, async (req, res) => {
  const { tag } = req.params;

  try {
    const host = await Host.read({ tags: tag });

    return res.json(host);
  } catch (error) {
    throw new HttpError('Unable to read hosts by tag');
  }
});

router.get('/pings', isAuthenticated, async (req, res) => {
  try {
    const pings = await Ping.read();

    return res.json(pings);
  } catch (error) {
    throw new HttpError('Unable to read pings');
  }
});

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new HttpError('Error when passing parameters');
  }

  try {
    const createdUser = await User.create({ name, email, password });

    delete createdUser.password;

    res.status(201).json(createdUser);
  } catch (error) {
    if (
      error.message.toLowerCase().includes('unique') &&
      error.message.toLowerCase().includes('email')
    ) {
      throw new HttpError('Email already in use');
    }

    throw new HttpError('Unable to create a user');
  }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.readById(userId);

    delete user.password;

    return res.json(user);
  } catch (error) {
    throw new HTTPError('Unable to find user', 400);
  }
});

router.delete('/users/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await User.remove(id);

    return res.sendStatus(204);
  } catch (error) {
    throw new HttpError('Unable to delete a user');
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { id: userId, password: hash } = await User.read({ email });

    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );

      return res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
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
