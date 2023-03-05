/* eslint-disable @typescript-eslint/ban-ts-comment */
import chai from 'chai';
import sinon from 'sinon';
import { showDataType } from '../utils';
import UserModel from '../../src/model/user.motel';

const { expect } = chai;

const userMockForCreate = {
  firstName: 'Márcio',
  lastName: 'Daniel',
  email: 'dan@gmail.com',
  password: '12345678',
};

const userMockResponse = {
  id: 1,
  firstName: 'Márcio',
  lastName: 'Daniel',
  email: 'marcio@daniel.com',
  password: '12345678',
  updatedAt: new Date(),
  createdAt: new Date(),

};

describe('UserModel | Tests methods', () => {
  describe('method createUser', () => {
    it('should create a user', async () => {
      const sut = new UserModel();
      const executeStub = sinon.stub().resolves([{ insertId: 1 }]);
      const releaseStub = sinon.stub().resolves();

      sinon.replace(sut, 'db', {
        execute: executeStub,
        release: releaseStub,
      });

      const response = await sut.createUser(userMockForCreate);
      expect(showDataType(response)).to.be.equal('number');
    });
  });

  describe('method getUserByEmail', () => {
    const sut = new UserModel();
    let result;

    before(async () => {
      const executeStub = sinon.stub().resolves([[userMockResponse]]);
      const releaseStub = sinon.stub().resolves();

      sinon.replace(sut, 'db', {
        execute: executeStub,
        release: releaseStub,
      });

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
