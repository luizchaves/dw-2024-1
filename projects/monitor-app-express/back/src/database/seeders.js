import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Host from '../models/Hosts.js';

function up() {
  const file = resolve('src', 'database', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));

  for (const host of seed.hosts) {
    Host.create(host);
  }
}

export default { up };
