const API_URL = '/api';

async function create(resource, data) {
  resource = `${API_URL}/${resource}`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(data),
  };

  const res = await fetch(resource, options);

  const createdData = await res.json();

  return createdData;
}

async function read(resource) {
  resource = `${API_URL}/${resource}`;

  const res = await fetch(resource);

  return await res.json();
}

async function update(resource, data) {
  resource = `${API_URL}/${resource}`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
    body: JSON.stringify(data),
  };

  const res = await fetch(resource, options);

  const updatedData = await res.json();

  return updatedData;
}

async function remove(resource) {
  resource = `${API_URL}/${resource}`;

  const options = {
    method: 'delete',
  };

  const res = await fetch(resource, options);

  return res.ok;
}

export default { create, read, update, remove };
