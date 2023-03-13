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

  afterEach(() => {
    sinon.restore();
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
    describe('in error case | Tests result', () => {
      it('should throw an error if user not found', async () => {
        try {
          sinon.stub().resolves(null);
          await sut.signIn(userMoc.email, userMoc.password);
        } catch (err) {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('Invalid email or password');
        }
      });

      it('should throw an error if password is invalid', async () => {
        try {
          const getUserByEmailStub = sinon.stub().resolves(userMoc);
          const compareHashStub = sinon.stub().resolves(false);

          sinon.replace(sut, 'userModel', {
            getUserByEmail: getUserByEmailStub,
          });

          sinon.replace(sut, 'cryptoHelper', {
            compareHash: compareHashStub,
          });
          await sut.signIn(userMoc.email, userMoc.password);
        } catch (err) {
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('Invalid email or password');
        }
      });
    });
  });
});
