import { PoolConnection } from 'mysql2/promise';
import getConnection from './connection';

const { log, time, timeEnd } = console;

const migrations = async (): Promise<void> => {
  time('\x1b[32mMigrations queries run successfully\x1b[0m');
  const db: PoolConnection = await getConnection();

  await db.beginTransaction();

  try {
    await db.query('DROP DATABASE IF EXISTS `login`');

    await db.query('CREATE DATABASE IF NOT EXISTS `login`');

    await db.query(`
      CREATE TABLE login.\`user\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        \`password\` VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      );
    `);

    await db.commit();

    timeEnd('\x1b[32mMigrations query successfully\x1b[0m');
  } catch (err) {
    log(err);

    await db.rollback();
  } finally {
    db.release();
  }
};

export default migrations;
