import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ola', (req, res) => {
  res.send('Olá, Mundo');
});

// Query param
app.get('/hello/en', (req, res) => {
  const name = req.query.name;

  if (name) {
    const result = {
      message: `Hello, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
});

// Router param
app.get('/hello/pt/:name', (req, res) => {
  const name = req.params.name;

  if (name) {
    const result = {
      message: `Olá, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
});

// Body param
app.post('/hello/es', (req, res) => {
  const name = req.body.name;

  if (name) {
    const result = {
      message: `¡Hola, ${name}!`,
    };

    res.json(result);
  } else {
    throw new HTTPError('Name is required', 400);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
app.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
