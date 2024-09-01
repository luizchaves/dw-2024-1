import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import ping from 'ping';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

app.post('/ping', async (req, res) => {
  const { host } = req.query;

  if (!host) {
    throw new HTTPError('Error when passing parameters', 400);
  }

  try {
    const pingResult = await ping.promise.probe(host);

    if (
      ['Name or service not known', 'Unknown host'].some((msg) =>
        pingResult.output.includes(msg)
      )
    ) {
      throw new Error('Unknown host');
    }

    res.json(pingResult);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  }

  // console.error(err.stack);
  // next(err)
  return res.status(500).json({ message: 'Something broke!' });
});

app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
