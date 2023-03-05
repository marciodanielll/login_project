import chai from 'chai';

import { showDataType } from '../utils';
import UserModel from '../../src/model/user.motel';

const { expect } = chai;

const user = {
  firstName: 'Márcio',
  lastName: 'Daniel',
  email: 'dan@gmail.com',
  password: '12345678',
};

describe.only(' Test Unit | UserModel', () => {
  describe('Test method | createUser', () => {
    it('should create a user', async () => {
      const sut = new UserModel();
      const result = await sut.createUser(user);
      expect(showDataType(result)).to.be.equal('number');
    });
  });

  describe('Test method | getUserByEmail', () => {
    const sut = new UserModel();
    let result;
    before(async () => {
      result = await sut.getUserByEmail('marcio@daniel.com');
    });

    it('should return an object', async () => {
      expect(showDataType(result)).to.be.equal('object');
    });

    it(`should return an object with the properties:
     firstName, lastName, email, password, createdAt, and updatedAt`, async () => {
      const expectedKeys = ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt'];
      expect(result).to.have.all.keys(expectedKeys);
    });

    it('id should be a number', async () => {
      expect(showDataType(result.id)).to.be.equal('number');
    });

    it('firstName should be a string', async () => {
      expect(showDataType(result.firstName)).to.be.equal('string');
    });

    it('lastName should be a string', async () => {
      expect(showDataType(result.lastName)).to.be.equal('string');
    });

    it('email should be a string', async () => {
      expect(showDataType(result.email)).to.be.equal('string');
    });

    it('email should be a valid email', async () => {
      expect(result.email).to.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    });

    it('password should be a string', async () => {
      expect(showDataType(result.password)).to.be.equal('string');
    });

    it('createdAt should be a valid date', async () => {
      expect(result.createdAt).to.to.an('date');
    });

    it('updatedAt should be a valid date', async () => {
      expect(result.updatedAt).to.to.an('date');
    });
  });
});
