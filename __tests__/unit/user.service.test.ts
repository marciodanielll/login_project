import { expect } from 'chai';
import LoginService from '../../src/services/login.servicer';

const userMockForCreate = {
  firstName: 'Márcio',
  lastName: 'Daniel',
  email: 'dan@gmail.com',
  password: '12345678',
};
describe('LoginService', () => {
  let sut: LoginService;

  before(() => {
    sut = new LoginService();
  });

  /*   describe('signIn', () => {
    let user: any;
    let token: string;

    before(async () => {
    });

    it('should return a valid token for an existing user with correct credentials', async () => {

    });

    it('should throw an exception for a non-existent user', async () => {

    });

    it('should throw an exception for an existing user with incorrect password', async () => {

    });
  }); */

  describe('signUp', () => {
    let response;
    before(() => {
      response = sut.signUp(userMockForCreate);
    });

    it('should create a new user with valid credentials', async () => {

    });

    it('should throw an exception for an existing email', async () => {

    });
  });
});
