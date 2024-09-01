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
};

describe('Moniotr App', () => {
  describe('Hosts Endpoints', () => {
    describe('POST /hosts', () => {
      it('should create a new host', async () => {
        const response = await request(app).post('/hosts').send(newHost);

        createdHost = response.body;

        expect(response.statusCode).toBe(201);
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
});
