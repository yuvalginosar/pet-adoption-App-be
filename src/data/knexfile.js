import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToMigrations = path.resolve(__dirname, '../migrations');

const knexConfig = {
  client: 'mysql',
  connection: {
    database: 'petsapp',
    user: 'root',
    password: '321ginosar',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex-migrations',
    directory: pathToMigrations,
    loadExtensions: ['.mjs'],
  },
};
export default knexConfig;