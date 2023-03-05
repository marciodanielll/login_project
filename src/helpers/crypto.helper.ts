import bcrypt from 'bcrypt';
import config from '../../configs/env.vars';

const { security } = config;

export interface ICryptoHelper {
  createHash(password: string): Promise<string>;
  compareHash(password: string, hash: string): Promise<boolean>;
}

export default class CryptoHelper implements ICryptoHelper {
  private crypto: typeof bcrypt;

  private readonly salt: number;

  constructor() {
    this.crypto = bcrypt;
    this.salt = security.salt;
  }

  async createHash(password: string): Promise<string> {
    return this.crypto.hash(password, this.salt);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return this.crypto.compare(password, hash);
  }
}
