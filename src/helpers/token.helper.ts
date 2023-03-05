import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { TokenPayload, ITokenHelper } from 'src/types/token.types';
import config from '../../configs/env.vars';

const { security } = config;

export default class TokenHelper implements ITokenHelper {
  public readonly secret: string;

  public readonly expiresIn: string;

  public readonly jwt: typeof jwt;

  constructor() {
    this.secret = security.secret;
    this.expiresIn = security.expiresIn;
    this.jwt = jwt;
  }

  create(payload: TokenPayload): string {
    const token = this.jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as SignOptions);
    return token;
  }

  validate(token: string): TokenPayload | null {
    try {
      const decodedToken = this.jwt
        .verify(token, this.secret, { ignoreExpiration: false } as VerifyOptions);

      return decodedToken as TokenPayload;
    } catch (err) {
      return null;
    }
  }
}
