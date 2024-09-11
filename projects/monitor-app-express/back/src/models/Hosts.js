import Database from '../database/database.js';

async function create({ name, address }) {
  const db = await Database.connect();

  const sql = `
      INSERT INTO
        hosts (name, address)
      VALUES
        (?, ?)
    `;

  const { lastID } = await db.run(sql, [name, address]);

  db.close();

  return await readById(lastID);
}

async function read(where) {
  const db = await Database.connect();

  if (where) {
    const field = Object.keys(where)[0];

    const value = where[field];

    const sql = `
      SELECT
          *
        FROM
          hosts
        WHERE
          ${field} LIKE CONCAT( '%',?,'%')
      `;

    const hosts = await db.all(sql, [value]);

    db.close();

    return hosts;
  }

  const sql = `
    SELECT
      *
    FROM
      hosts
  `;

  const hosts = await db.all(sql);

  db.close();

  return hosts;
}

async function readById(id) {
  const db = await Database.connect();

  const sql = `
      SELECT
          *
        FROM
          hosts
        WHERE
          id = ?
      `;

  const host = await db.get(sql, [id]);

  db.close();

  return host;
}

async function update({ id, name, address }) {
  const db = await Database.connect();

  const sql = `
      UPDATE
        hosts
      SET
        name = ?, address = ?
      WHERE
        id = ?
    `;

  const { changes } = await db.run(sql, [name, address, id]);

  db.close();

  if (changes === 1) {
    return readById(id);
  } else {
    throw new Error('Host not found');
  }
}

async function remove(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      hosts
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [id]);

  db.close();

  if (changes === 1) {
    return true;
  } else {
    throw new Error('Host not found');
  }
}

export default { create, read, readById, update, remove };
