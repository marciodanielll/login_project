import { expect } from 'chai';
import { showDataType } from '../utils';
import CryptoHelper from '../../src/helpers/crypto.helper';

describe('CryptoHelper', () => {
  const sut = new CryptoHelper();
  const password1 = 'batatinhas';
  const password2 = 'cebolinhas';
  describe('createHash', () => {
    let hash1: string;
    let hash2: string;

    before(async () => {
      hash1 = await sut.createHash(password1);
      hash2 = await sut.createHash(password2);
    });

    it('should return a string', async () => {
      expect(showDataType(hash1)).to.be.equal('string');
    });

    it('should return a hash with a valid pattern', async () => {
      expect(hash2).to.matches(/^$2[aby]$[0-9]{2}$[./A-Za-z0-9]{53}$/);
    });

    it('should return a different hash for different passwords', async () => {
      expect(hash1).to.not.be.equal(hash2);
    });
  });

  describe('compareHash', () => {
    let hash: string;

    before(async () => {
      hash = await sut.createHash(password1);
    });

    it('should return true for a match password', async () => {
      const isMatch = await sut.compareHash(password1, hash);
      expect(isMatch).to.be.equals(true);
    });

    it('should return false for a no match password', async () => {
      const isMatch = await sut.compareHash(password2, hash);
      expect(isMatch).to.be.equals(false);
    });
  });
});
