import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface ITokenHelper {
  readonly secret: string;
  readonly expiresIn: string;
  readonly jwt: typeof jwt;
  create(payload: TokenPayload): string;
  validate(token: string): TokenPayload | null;
}
