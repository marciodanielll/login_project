import chai from 'chai';
import { showDataType } from '../../utils';
import envVars from '../../../configs/env.vars';

const { database, security } = envVars;

const { expect } = chai;

describe('CONFIGS', () => {
  describe('Database | Test vars', () => {
    it('should a object', () => {
      expect(showDataType(database)).to.be.equals('object');
    });
    it('should have properties host', () => {
      expect(database).to.have.property('host');
    });

    it('should have properties port', () => {
      expect(database).to.have.property('port');
    });

    it('should have properties user', () => {
      expect(database).to.have.property('user');
    });

    it('should have properties password', () => {
      expect(database).to.have.property('password');
    });

    it('should have properties name', () => {
      expect(database).to.have.property('name');
    });

    it('should have properties host as string', () => {
      expect(showDataType(database.host)).to.equals('string');
    });

    it('should have properties port as number', () => {
      expect(showDataType(database.port)).to.equals('number');
    });

    it('should have properties user as string', () => {
      expect(showDataType(database.user)).to.equals('string');
    });

    it('should have properties password as string', () => {
      expect(showDataType(database.password)).to.equals('string');
    });

    it('should have properties name as string', () => {
      expect(showDataType(database.name)).to.equals('string');
    });
  });

  describe('Security | Test vars', () => {
    it('should a object', () => {
      expect(showDataType(security)).to.be.equals('object');
    });

    it('should have properties secret', () => {
      expect(security).to.have.property('secret');
    });

    it('should have properties expiresIn', () => {
      expect(security).to.have.property('expiresIn');
    });

    it('should have properties salt', () => {
      expect(security).to.have.property('salt');
    });

    it('should have properties secret as string', () => {
      expect(showDataType(security.secret)).to.equals('string');
    });

    it('should have properties expiresIn as string', () => {
      expect(showDataType(security.expiresIn)).to.equals('string');
    });

    it('should represent a valid input', () => {
      expect(security.expiresIn).to.be.a.matches(/^[0-9]+(s|m|h|d|w|y)$/);
    });

    it('should have properties salt as number', () => {
      expect(showDataType(security.salt)).to.equals('number');
    });
  });

  describe('App | Test vars', () => {
    it('should a object', () => {
      expect(showDataType(envVars.app)).to.be.equals('object');
    });

    it('should have properties port', () => {
      expect(envVars.app).to.have.property('port');
    });

    it('should have properties port as number', () => {
      expect(showDataType(envVars.app.port)).to.equals('number');
    });
  });
});
