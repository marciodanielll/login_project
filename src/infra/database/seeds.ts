import { PoolConnection } from 'mysql2/promise';
import getConnection from './connection';

const { log, time, timeEnd } = console;

const seeds = async (): Promise<void> => {
  time('\x1b[32mSeeds query successfully\x1b[0m');
  const db: PoolConnection = await getConnection();
  db.beginTransaction();

  try {
    await db.query(`
      INSERT INTO login.user (first_name, last_name, email, password)
      VALUES ('Márcio', 'Daniel', 'marcio@daniel', 'mudar123');
    `);

    await db.query(`
      INSERT INTO login.state (name, uf) VALUES
      ('Acre', 'AC'), ('Alagoas', 'AL'), ('Amapá', 'AP'), ('Amazonas', 'AM'),
      ('Bahia', 'BA'), ('Ceará', 'CE'), ('Distrito Federal', 'DF'),
      ('Espírito Santo', 'ES'), ('Goiás', 'GO'), ('Maranhão', 'MA'),
      ('Mato Grosso', 'MT'), ('Mato Grosso do Sul', 'MS'), ('Minas Gerais', 'MG'),
      ('Pará', 'PA'), ('Paraíba', 'PB'), ('Paraná', 'PR'), ('Pernambuco', 'PE'),
      ('Piauí', 'PI'), ('Rio de Janeiro', 'RJ'), ('Rio Grande do Norte', 'RN'),
      ('Rio Grande do Sul', 'RS'), ('Rondônia', 'RO'), ('Roraima', 'RR'),
      ('Santa Catarina', 'SC'), ('São Paulo', 'SP'), ('Sergipe', 'SE'), ('Tocantins', 'TO');
    `);

    await db.query(`
      INSERT INTO login.city (name, state_id)
      VALUES ('São Paulo', 1);
    `);

    await db.query(`
      INSERT INTO login.address (street, number, complement, neighborhood, zip_code, city_id)
      VALUES ('Av. Paulista', '1000', 'Apto 123', 'Bela Vista', '01310-100', 1);
    `);

    await db.query(`
      INSERT INTO login.user_address (user_id, address_id)
      VALUES (1, 1);
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
