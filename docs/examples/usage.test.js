/* eslint-disable no-invalid-this */
import method from '../../src/typed-method';
import {expect} from 'chai';

describe('Usage example', function () {
  it(``, function () {
    const equal = method('equal', {negate: 'unequal', commutative: true});
    const greater = method('greater', {
      reciprocal: 'lower',
      negate: 'lowerOrEqual',
      loose: 'greaterOrEqual',
      condition: 'equal',
    });

    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    equal(function (obj) {
      return this.n === obj.n;
    }, Num);

    greater(function (obj) {
      return this.n > obj.n;
    }, Num);

    const one = new Num(1);
    const two = new Num(2);

    expect(one.equal(two)).to.be.false;
    expect(one.equal(one)).to.be.true;

    expect(one.greater(two)).to.be.false;
    expect(two.greater(one)).to.be.true;

    expect(one.lower(two)).to.be.true;
    expect(two.lower(one)).to.be.false;

    expect(one.lowerOrEqual(two)).to.be.true;
    expect(two.lowerOrEqual(one)).to.be.false;
    expect(one.lowerOrEqual(one)).to.be.true;

    expect(one.greaterOrEqual(two)).to.be.false;
    expect(two.greaterOrEqual(one)).to.be.true;
    expect(one.greaterOrEqual(one)).to.be.true;
  });
});
