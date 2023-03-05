export interface ICryptoHelper {
  createHash(password: string): Promise<string>;
  compareHash(password: string, hash: string): Promise<boolean>;
}
