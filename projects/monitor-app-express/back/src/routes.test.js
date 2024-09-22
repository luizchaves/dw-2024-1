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
};

describe('Moniotr App', () => {
  describe('Hosts Endpoints', () => {
    describe('POST /hosts', () => {
      it('should create a new host', async () => {
        const response = await request(app).post('/hosts').send(newHost);

        createdHost = response.body;

        expect(response.statusCode).toBe(201);
      });

      it('should create a new host with tags', async () => {
        const tags = ['DNS'];

        const response = await request(app)
          .post('/hosts')
          .send({ name: 'Google DNS', address: '8.8.4.4', tags });

        expect(response.statusCode).toBe(201);

        const hasValidTag = response.body.tags
          .map((_) => _.tag)
          .some((tag) => tag.name === tags[0]);

        expect(hasValidTag).toBeTruthy();
      });

      it('should not create a new host without name or address', async () => {
        const response = await request(app).post('/hosts').send({
          name: 'DNS Server',
        });

        expect(response.statusCode).toBe(400);
      });
    });

    describe('GET /hosts', () => {
      it('should show all hosts', async () => {
        const response = await request(app).get('/hosts');

        expect(response.statusCode).toBe(200);
      });

      it('should list the valid host', async () => {
        const response = await request(app).get('/hosts');

        const hasValidHost = response.body.some(
          (host) => host.address === createdHost.address
        );

        expect(hasValidHost).toBeTruthy();
      });

      it('should show all hosts by name', async () => {
        const response = await request(app).get('/hosts?name=DNS');

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /hosts/:hostId', () => {
      it('should show a host by id', async () => {
        const response = await request(app).get(`/hosts/${createdHost.id}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.name).toBe(createdHost.name);
      });

      it('should not show a host with invalid id', async () => {
        const response = await request(app).get(`/hosts/x`);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to read a host');
      });
    });

    describe('PUT /hosts/:hostId', () => {
      it('should update a host', async () => {
        const response = await request(app)
          .put(`/hosts/${createdHost.id}`)
          .send(updatedHost);

        expect(response.statusCode).toBe(200);
      });

      it('should list an updated host', async () => {
        const response = await request(app).get('/hosts');

        const hasValidHost = response.body.some(
          (host) => host.address === updatedHost.address
        );

        expect(hasValidHost).toBeTruthy();
      });

      it('should not update a host without name or address', async () => {
        const response = await request(app)
          .put(`/hosts/${createdHost.id}`)
          .send({
            name: 'Cloudflare DNS',
          });

        expect(response.statusCode).toBe(400);
      });

      it('should not update a host with invalid id', async () => {
        const response = await request(app).put(`/hosts/x`).send(updatedHost);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to update a host');
      });
    });

    describe('DELETE /hosts/:hostId', () => {
      it('should remove a host', async () => {
        const response = await request(app).delete(`/hosts/${createdHost.id}`);

        expect(response.statusCode).toBe(204);
      });

      it('should not delete a host with invalid id', async () => {
        const response = await request(app).delete(`/hosts/x`);

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe('Unable to delete a host');
      });
    });
  });

  describe('Tag Endpoints', () => {
    describe('GET /tags', () => {
      it('should show tags', async () => {
        const response = await request(app).get(`/tags`);

        expect(response.statusCode).toBe(200);
      });
    });

    describe('GET /tags/:tagName/hosts', () => {
      it('should show hosts by tagName', async () => {
        const response = await request(app).get(
          `/tags/${createdHost.id}/hosts`
        );

        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('User Endpoints', () => {
    describe('POST /users', () => {
      it('should create a new user', async () => {
        const response = await request(app).post('/users').send(validUser);

        const userId = response.body.id;

        await request(app).delete(`/users/${userId}`);

        expect(response.statusCode).toBe(201);
      });

      it('should not create a new user with same email', async () => {
        let response = await request(app).post('/users').send(validUser);

        const userId = response.body.id;

        response = await request(app).post('/users').send(validUser);

        expect(response.statusCode).toBe(400);

        await request(app).delete(`/users/${userId}`);
      });

      it('should not create a new user without email', async () => {
        const { name, password } = validUser;

        const response = await request(app)
          .post('/users')
          .send({ name, password });

        expect(response.statusCode).toBe(400);
      });
    });
  });

  describe('Host Ping Endpoints', () => {
    describe('POST /hosts/:hostId/pings/:count', () => {
      it('should not create a ping with valid host and without user', async () => {
        let response = await request(app).post('/hosts').send(newHost);

        response = await request(app).post(
          `/hosts/${response.body.id}/pings/3`
        );

        expect(response.statusCode).toBe(400);
      });

      it('should create a ping with valid host', async () => {
        let response = await request(app).post('/users').send(validUser);

        const userId = response.body.id;

        response = await request(app).post('/hosts').send(newHost);

        response = await request(app).post(
          `/hosts/${response.body.id}/pings/3`
        );

        await request(app).delete(`/users/${userId}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.icmps.length).toBe(3);
      });

      it('should not create a ping with unknown ip', async () => {
        let response = await request(app).post('/users').send(validUser);

        const userId = response.body.id;

        response = await request(app)
          .post('/hosts')
          .send({ name: 'unknown host', address: '172.16.0.1' });

        response = await request(app).post(
          `/hosts/${response.body.id}/pings/3`
        );

        await request(app).delete(`/users/${userId}`);

        expect(response.statusCode).toBe(400);
      });

      it('should not create a ping with unknown domain', async () => {
        let response = await request(app).post('/users').send(validUser);

        const userId = response.body.id;

        response = await request(app).post('/hosts').send({
          name: 'unknown host',
          address: 'www.unknownhost123456789xyz.com',
        });

        response = await request(app).post(
          `/hosts/${response.body.id}/pings/3`
        );

        await request(app).delete(`/users/${userId}`);

        expect(response.statusCode).toBe(400);
      });
    });

    describe('GET /hosts/:hostId/pings', () => {
      it('should show a ping by hostId', async () => {
        const response = await request(app).get(
          `/hosts/${createdHost.id}/pings`
        );

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
