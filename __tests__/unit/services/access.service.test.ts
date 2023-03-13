import { expect } from 'chai';
import sinon from 'sinon';
import AccessService from '../../../src/core/services/access.service';

const userMoc = {
  id: 1,
  firstName: 'Márcio',
  lastName: 'Daniel',
  email: 'dan@gmail.com',
  password: '12345678',
};

describe('ACCESS_SERVICE', () => {
  let sut: AccessService;

  before(() => {
    sut = new AccessService();
  });
  describe('signIn', () => {
    describe('in success case | Tests result', () => {
      it('should return a token', async () => {
        const getUserByEmailStub = sinon.stub().resolves(userMoc);
        const compareHashStub = sinon.stub().resolves(true);
        const createTokenStub = sinon.stub().returns('token');

        sinon.replace(sut, 'userModel', {
          getUserByEmail: getUserByEmailStub,
        });

        sinon.replace(sut, 'cryptoHelper', {
          compareHash: compareHashStub,
        });

        sinon.replace(sut, 'tokenHelper', {
          create: createTokenStub,
        });

        const token = await sut.signIn(userMoc.email, userMoc.password);
        expect(token).to.be.a('string');
      });
    });
  });
});
