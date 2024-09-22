import request from 'supertest';
import app from './index.js';

let createdHost;

const newHost = {
  name: 'DNS Server',
  address: '1.1.1.1',
};

const updatedHost = {
  name: 'Cloudflare DNS',
  address: '1.1.1.1',
  tags: ['DNS', 'Cloudflare'],
};

const validUser = {
  name: 'Valid',
  email: 'valid@email.com',
  password: '123',
  confirmationPassword: '123',
};

const invalidUser = {
  name: 'Invalid',
  email: 'invalid@email.com',
  password: '123',
  confirmationPassword: '123',
};

async function loadToken(user) {
  const response = await request(app).post('/signin').send(user);

  return response.body.token;
}

describe('Moniotr App', () => {
  beforeAll(() => console.log('2 - beforeAll'));

  describe('User Endpoints', () => {
    describe('POST /users', () => {
      it('should create a new user', async () => {
        const response = await request(app).post('/users').send(validUser);

        expect(response.statusCode).toBe(201);
      });

      it('should not create a new user with same email', async () => {
        const response = await request(app).post('/users').send(validUser);

        expect(response.statusCode).toBe(400);
      });

      it('should not create a new user without email', async () => {
        const { name, password } = validUser;

        const response = await request(app)
          .post('/users')
          .send({ name, password });

        expect(response.statusCode).toBe(400);
      });
    });

    describe('GET /users/me', () => {
      it('should not show the current user without login', async () => {
        const response = await request(app).get('/users/me');

        expect(response.statusCode).toBe(401);
      });

      it('should show the current user', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get('/users/me')
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Sign in Endpoints', () => {
    describe('POST /signin', () => {
      it('should login a valid user', async () => {
        const response = await request(app).post('/signin').send(validUser);

        expect(response.statusCode).toBe(200);
      });

      it('should not login an invalid user', async () => {
        const response = await request(app).post('/signin').send(invalidUser);

        expect(response.statusCode).toBe(401);
      });
    });
  });

  describe('Hosts Endpoints', () => {
    describe('POST /hosts', () => {
      it('should not create a new host without login', async () => {
        const response = await request(app).post('/hosts').send(newHost);

        expect(response.statusCode).toBe(401);
      });

      it('should create a new host', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send(newHost);

        createdHost = response.body;

        expect(response.statusCode).toBe(201);
      });

      it('should create a new host with tags', async () => {
        const token = await loadToken(validUser);

        const tags = ['DNS'];

        const response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send({ name: 'Google DNS', address: '8.8.4.4', tags });

        expect(response.statusCode).toBe(201);

        const hasValidTag = response.body.tags
          .map((_) => _.tag)
          .some((tag) => tag.name === tags[0]);

        expect(hasValidTag).toBeTruthy();
      });

      it('should not create a new host without name or address', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send({
            name: 'DNS Server',
          });

        expect(response.statusCode).toBe(400);
      });
    });

    describe('GET /hosts', () => {
      it('should not show all hosts without login', async () => {
        const response = await request(app).get('/hosts');

        expect(response.statusCode).toBe(401);
      });

      it('should show all hosts', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get('/hosts')
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });

      it('should list the valid host', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get('/hosts')
          .set('Authorization', 'bearer ' + token);

        const hasValidHost = response.body.some(
          (host) => host.address === createdHost.address
        );

        expect(hasValidHost).toBeTruthy();
      });

      it('should show all hosts by name', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get('/hosts?name=DNS')
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /hosts/:hostId', () => {
      it('should not show a host by id without login', async () => {
        const response = await request(app).get(`/hosts/${createdHost.id}`);

        expect(response.statusCode).toBe(401);
      });

      it('should show a host by id', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/hosts/${createdHost.id}`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);

        expect(response.body.name).toBe(createdHost.name);
      });

      it('should not show a host with invalid id', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/hosts/x`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to read a host');
      });
    });

    describe('PUT /hosts/:hostId', () => {
      it('should not update a host without login', async () => {
        const response = await request(app)
          .put(`/hosts/${createdHost.id}`)
          .send(updatedHost);

        expect(response.statusCode).toBe(401);
      });

      it('should update a host', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .put(`/hosts/${createdHost.id}`)
          .set('Authorization', 'bearer ' + token)
          .send(updatedHost);

        expect(response.statusCode).toBe(200);
      });

      it('should list an updated host', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get('/hosts')
          .set('Authorization', 'bearer ' + token);

        const hasValidHost = response.body.some(
          (host) => host.address === updatedHost.address
        );

        expect(hasValidHost).toBeTruthy();
      });

      it('should not update a host without name or address', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .put(`/hosts/${createdHost.id}`)
          .set('Authorization', 'bearer ' + token)
          .send({
            name: 'Cloudflare DNS',
          });

        expect(response.statusCode).toBe(400);
      });

      it('should not update a host with invalid id', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .put(`/hosts/x`)
          .set('Authorization', 'bearer ' + token)
          .send(updatedHost);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to update a host');
      });
    });

    describe('DELETE /hosts/:hostId', () => {
      it('should not remove a host without login', async () => {
        const response = await request(app).delete(`/hosts/${createdHost.id}`);

        expect(response.statusCode).toBe(401);
      });

      it('should remove a host', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .delete(`/hosts/${createdHost.id}`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(204);
      });

      it('should not delete a host with invalid id', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .delete(`/hosts/x`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to delete a host');
      });
    });
  });

  describe('Host Ping Endpoints', () => {
    describe('POST /hosts/:hostId/pings/:count', () => {
      it('should not create a ping with valid host without login', async () => {
        const response = await request(app).post(`/hosts/1/pings/3`);

        expect(response.statusCode).toBe(401);
      });

      it('should create a ping with valid host', async () => {
        const token = await loadToken(validUser);

        let response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send(newHost);

        response = await request(app)
          .post(`/hosts/${response.body.id}/pings/3`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);

        expect(response.body.icmps.length).toBe(3);
      });

      it('should not create a ping with unknown ip', async () => {
        const token = await loadToken(validUser);

        let response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send({ name: 'unknown host', address: '172.16.0.1' });

        response = await request(app)
          .post(`/hosts/${response.body.id}/pings/3`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(400);
      });

      it('should not create a ping with unknown domain', async () => {
        const token = await loadToken(validUser);

        let response = await request(app)
          .post('/hosts')
          .set('Authorization', 'bearer ' + token)
          .send({
            name: 'unknown host',
            address: 'www.unknownhost123456789xyz.com',
          });

        response = await request(app)
          .post(`/hosts/${response.body.id}/pings/3`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(400);
      });
    });

    describe('GET /hosts/:hostId/pings', () => {
      it('should not show a ping by hostId without login', async () => {
        const response = await request(app).get(
          `/hosts/${createdHost.id}/pings`
        );

        expect(response.statusCode).toBe(401);
      });

      it('should show a ping by hostId', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/hosts/${createdHost.id}/pings`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Tag Endpoints', () => {
    describe('GET /tags', () => {
      it('should not show tags without login', async () => {
        const response = await request(app).get(`/tags`);

        expect(response.statusCode).toBe(401);
      });

      it('should show tags', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/tags`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /tags/:tagName/hosts', () => {
      it('should not show hosts by tagName without login', async () => {
        const response = await request(app).get(
          `/tags/${createdHost.id}/hosts`
        );

        expect(response.statusCode).toBe(401);
      });

      it('should show hosts by tagName', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/tags/${createdHost.id}/hosts`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('Ping Endpoints', () => {
    describe('GET /pings', () => {
      it('should not show pings without login', async () => {
        const response = await request(app).get(`/pings`);

        expect(response.statusCode).toBe(401);
      });

      it('should show pings', async () => {
        const token = await loadToken(validUser);

        const response = await request(app)
          .get(`/pings`)
          .set('Authorization', 'bearer ' + token);

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('404 Endpoints', () => {
    describe('GET /unknown-endpoint', () => {
      it('should show pings', async () => {
        const response = await request(app).get(`/unknown-endpoint`);

        expect(response.statusCode).toBe(404);
      });
    });
  });
});
