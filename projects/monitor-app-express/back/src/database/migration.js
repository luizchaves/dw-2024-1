import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const hostsSql = `
    CREATE TABLE hosts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      address VARCHAR(100) NOT NULL
    )
  `;

  await db.run(hostsSql);

  db.close();
}

async function down() {
  const db = await Database.connect();

  const hostsSql = `
    DROP TABLE hosts
  `;

  await db.run(hostsSql);

  db.close();
}

export default { up, down };
