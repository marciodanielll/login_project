import mysql2, { Pool, PoolConnection } from 'mysql2/promise';
import config from '../../../configs/env.vars';

const { database: { name: _, ...others } } = config;

let db: PoolConnection;

const getConnection = async (): Promise<PoolConnection> => {
  if (db) {
    return db;
  }

  const pool: Pool = mysql2.createPool({
    ...others,
  });
  const connection: PoolConnection = await pool.getConnection();

  db = connection;

  return connection;
};

export default getConnection;
