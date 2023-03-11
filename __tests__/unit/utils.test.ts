import chai from 'chai';
import { showDataType } from '../utils';

const { expect } = chai;

describe('UTILS | For tests', () => {
  it('should return a type array', () => {
    expect(showDataType([])).to.be.equals('array');
  });
  it('should return a type object', () => {
    expect(showDataType({})).to.be.equals('object');
  });
  it('should return a type number', () => {
    expect(showDataType(1)).to.be.equals('number');
  });
  it('should return a type string', () => {
    expect(showDataType('1')).to.be.equals('string');
  });
  it('should return a type boolean', () => {
    expect(showDataType(true)).to.be.equals('boolean');
  });
});
