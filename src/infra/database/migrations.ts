import { PoolConnection } from 'mysql2/promise';
import getConnection from './connection';

const { log, time, timeEnd } = console;

const migrations = async (): Promise<void> => {
  time('migrations');
  const db: PoolConnection = await getConnection();
  db.beginTransaction();
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS `login`');

    await db.query(`
      CREATE TABLE \`user\` (
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
      CREATE TABLE \`state\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL,
        \`uf\` CHAR(2) NOT NULL,
        PRIMARY KEY (\`id\`),
        ON DELETE CASCADE,
        ON UPDATE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE \`city\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL,
        \`state_id\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        ON DELETE CASCADE,
        ON UPDATE CASCADE,
        FOREIGN KEY (\`state_id\`) REFERENCES \`state\`(\`id\`)
      );
    `);

    await db.query(`
      CREATE TABLE \`address\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`street\` VARCHAR(100) NOT NULL,
        \`number\` VARCHAR(10) NOT NULL,
        \`complement\` VARCHAR(100) NULL,
        \`neighborhood\` VARCHAR(100) NOT NULL,
        \`zip_code\` VARCHAR(10) NOT NULL,
        \`city_id\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        ON DELETE CASCADE,
        ON UPDATE CASCADE,
        FOREIGN KEY (\`city_id\`) REFERENCES \`city\`(\`id\`)
      );
    `);

    await db.query(`
      CREATE TABLE \`user_address\` (
        \`user_id\` INT NOT NULL,
        \`address_id\` INT NOT NULL,
        PRIMARY KEY (\`user_id\`, \`address_id\`),
        ON DELETE CASCADE,
        ON UPDATE CASCADE,
        FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`),
        FOREIGN KEY (\`address_id\`) REFERENCES \`address\`(\`id\`)
      );
    `);
    db.commit();
  } catch (err) {
    log(err);

    db.rollback();
  } finally {
    timeEnd('migrations');
    db.release();
  }
};

export default migrations;
