import { PoolConnection } from 'mysql2/promise';
import getConnection from './connection';

const { log, time, timeEnd } = console;

const migrations = async (): Promise<void> => {
  time('\x1b[32mMigration query successfully\x1b[0m');
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

    await db.query(`
      CREATE TABLE login.\`state\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL,
        \`uf\` CHAR(2) NOT NULL,
        PRIMARY KEY (\`id\`)
      );
    `);

    await db.query(`
      CREATE TABLE login.\`city\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL,
        \`state_id\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`state_id\`) REFERENCES \`state\`(\`id\`)
      );
    `);

    await db.query(`
      CREATE TABLE login.\`address\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`street\` VARCHAR(100) NOT NULL,
        \`number\` VARCHAR(10) NOT NULL,
        \`complement\` VARCHAR(100) NULL,
        \`neighborhood\` VARCHAR(100) NOT NULL,
        \`zip_code\` VARCHAR(10) NOT NULL,
        \`city_id\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`city_id\`) REFERENCES \`city\`(\`id\`)
      );
    `);

    await db.query(`
      CREATE TABLE login.\`user_address\` (
        \`user_id\` INT NOT NULL,
        \`address_id\` INT NOT NULL,
        PRIMARY KEY (\`user_id\`, \`address_id\`),
        FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`),
        FOREIGN KEY (\`address_id\`) REFERENCES \`address\`(\`id\`)
      );
    `);

    db.commit();
    timeEnd('\x1b[32mMigration query successfully\x1b[0m');
    db.release();

    process.exit(0);
  } catch (err) {
    log(err);
    db.rollback();

    process.exit(0);
  }
};

export default migrations;

migrations();
