import { expect } from 'chai';

import { showDataType } from '../utils';
import TokenHelper from '../../src/helpers/token.helper';

import { tokenPayload } from './mocks';

describe('TokenHelper', () => {
  const sut = new TokenHelper();
  const token = sut.create(tokenPayload);

  describe('create', () => {
    it('should return a string', () => {
      expect(showDataType(token)).to.be.equals('string');
    });

    it('should return a valid token format', () => {
      expect(token).to.matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/);
    });
  });

  describe('validate', () => {
    const decode = sut.validate(token);

    it('should return an object', () => {
      expect(showDataType(decode)).to.be.equals('object');
    });

    it(`should return an object with properties:
    userId, email, iat, exp
    `, () => {
      expect(decode).to.have.all.keys('userId', 'email', 'iat', 'exp');
    });

    it('should have a string value for the UserId property', () => {
      expect(showDataType(decode.userId)).to.be.equals('string');
    });

    it('should have a string value for the email property', () => {
      expect(showDataType(decode.userId)).to.be.equals('string');
    });

    it('should have a valid email address for the email property', () => {
      expect(decode.email).to.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i);
    });

    it('should return null in case of an invalid token', () => {
      const decodeError = sut.validate('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1');
      expect(decodeError).to.equals(null);
    });
  });
});
