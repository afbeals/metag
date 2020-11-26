// External
import env from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

// Internal
const envFilePath = path.join(__dirname, '../.env.local');
env.config({ path: envFilePath });

// Constants
const {
  SERVER_PASSWORD,
  SERVER_USER,
  SERVER_HOST,
  SERVER_DB,
  SERVER_DB_PORT,
} = process.env;

let establishedPool = null;

const createPool = () => {
  const pool = new Pool({
    user: SERVER_USER,
    host: SERVER_HOST,
    database: SERVER_DB,
    password: SERVER_PASSWORD,
    port: SERVER_DB_PORT,
  });

  return pool;
};

const getPool = () => {
  if (!establishedPool) establishedPool = createPool();
  return establishedPool;
};

export default getPool;
