import { PoolConnection } from 'mysql2/promise';
import getConnection from './connection';

const { log, time, timeEnd } = console;

const seeds = async (): Promise<void> => {
  time('\x1b[32mSeeds queris run successfully\x1b[0m');
  const db: PoolConnection = await getConnection();
  db.beginTransaction();

  try {
    await db.query(`
      INSERT INTO login.user (first_name, last_name, email, password)
      VALUES ('Márcio', 'Daniel', 'marcio@daniel.com', 'mudar123');
    `);

    await db.commit();
    timeEnd('\x1b[32mSeeds query successfully\x1b[0m');
  } catch (err) {
    log(err);

    await db.rollback();
  } finally {
    db.release();
    process.exit();
  }
};

export default seeds;

seeds();
