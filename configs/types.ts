export default interface IConfig {
  security: {
    secret: string;
    expiresIn: string;
    salt: number;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  app: {
    port: number;
  };
}
