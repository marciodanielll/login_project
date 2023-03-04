import IConfig from './types';

const config: IConfig = {
  security: {
    secret: process.env.SECRET || 'secret',
    expiresIn: process.env.EXPIRESIN || '1d',
    salt: Number(process.env.SALT) || 10,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'login',
  },
  app: {
    port: Number(process.env.PORT) || 400,
  },
};

export default config;
