/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import method from '../src/typed-method';

describe('Testing function method', function () {
  beforeEach(function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    class Arr {
      constructor (...n) {
        this.n = n;
      }
    }

    this.Num = Num;
    this.Arr = Arr;
  });

  it('No option', function () {
    const equal = method('equal');

    equal(function (obj) {
      return this.n === obj.n;
    }, this.Num);

    equal(function (obj) {
      return this.n.every((a, i) => a === obj.n[i]);
    }, this.Arr);

    expect(new this.Num(3).equal(new this.Num(6))).to.be.false;
    expect(new this.Num(3).equal(new this.Num(3))).to.be.true;

    expect(new this.Arr(3).equal(new this.Arr(6))).to.be.false;
    expect(new this.Arr(3).equal(new this.Arr(3))).to.be.true;

    expect(() => new this.Num(3).equal(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).equal(new this.Num(3))).to.throw();

    equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).equal(new this.Arr(3))).to.be.true;
    expect(() => new this.Arr(3).equal(new this.Num(3))).to.throw();

    equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Arr, this.Num);

    expect(new this.Arr(3).equal(new this.Num(3))).to.be.true;
  });

  it('Option equal', function () {
    const equal = method('equal', {equal: true});

    equal(function (obj) {
      return this.n === obj.n;
    }, this.Num);

    equal(function (obj) {
      return this.n.every((a, i) => a === obj.n[i]);
    }, this.Arr);

    expect(new this.Num(3).equal(new this.Num(6))).to.be.false;
    expect(new this.Num(3).equal(new this.Num(3))).to.be.true;

    expect(new this.Arr(3).equal(new this.Arr(6))).to.be.false;
    expect(new this.Arr(3).equal(new this.Arr(3))).to.be.true;

    expect(() => new this.Num(3).equal(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).equal(new this.Num(3))).to.throw();

    equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).equal(new this.Arr(3))).to.be.false;
    expect(() => new this.Arr(3).equal(new this.Num(3))).not.to.throw();
    expect(new this.Arr(3).equal(new this.Num(3))).to.be.false;

    expect(() => equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Arr, this.Num)).to.throw();
  });

  it('Option unequal', function () {
    const unequal = method('unequal', {unequal: true});

    unequal(function (obj) {
      return this.n !== obj.n;
    }, this.Num);

    unequal(function (obj) {
      return this.n.some((a, i) => a !== obj.n[i]);
    }, this.Arr);

    expect(new this.Num(3).unequal(new this.Num(6))).to.be.true;
    expect(new this.Num(3).unequal(new this.Num(3))).to.be.false;

    expect(new this.Arr(3).unequal(new this.Arr(6))).to.be.true;
    expect(new this.Arr(3).unequal(new this.Arr(3))).to.be.false;

    expect(() => new this.Num(3).unequal(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).unequal(new this.Num(3))).to.throw();

    unequal(function (obj) {
      return (this.n[0] || this.n) !== (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).unequal(new this.Arr(3))).to.be.true;
    expect(() => new this.Arr(3).unequal(new this.Num(3))).not.to.throw();
    expect(new this.Arr(3).unequal(new this.Num(3))).to.be.true;

    expect(() => unequal(function (obj) {
      return (this.n[0] || this.n) !== (obj.n[0] || obj.n);
    }, this.Arr, this.Num)).to.throw();
  });

  it('Option commutative', function () {
    const equal = method('equal', {commutative: true});

    equal(function (obj) {
      return this.n === obj.n;
    }, this.Num);

    equal(function (obj) {
      return this.n.every((a, i) => a === obj.n[i]);
    }, this.Arr);

    expect(new this.Num(3).equal(new this.Num(6))).to.be.false;
    expect(new this.Num(3).equal(new this.Num(3))).to.be.true;

    expect(new this.Arr(3).equal(new this.Arr(6))).to.be.false;
    expect(new this.Arr(3).equal(new this.Arr(3))).to.be.true;

    expect(() => new this.Num(3).equal(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).equal(new this.Num(3))).to.throw();

    equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).equal(new this.Arr(3))).to.be.true;
    expect(() => new this.Arr(3).equal(new this.Num(3))).not.to.throw();
    expect(new this.Arr(3).equal(new this.Num(3))).to.be.true;

    expect(() => equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Arr, this.Num)).to.throw();
  });

  it('Option symmetric', function () {
    // commutative is better optimized when the implementation is actually
    // commutative, but they yield the same
    const equal = method('equal', {symmetric: true});

    equal(function (obj) {
      return this.n === obj.n;
    }, this.Num);

    equal(function (obj) {
      return this.n.every((a, i) => a === obj.n[i]);
    }, this.Arr);

    expect(new this.Num(3).equal(new this.Num(6))).to.be.false;
    expect(new this.Num(3).equal(new this.Num(3))).to.be.true;

    expect(new this.Arr(3).equal(new this.Arr(6))).to.be.false;
    expect(new this.Arr(3).equal(new this.Arr(3))).to.be.true;

    expect(() => new this.Num(3).equal(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).equal(new this.Num(3))).to.throw();

    equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).equal(new this.Arr(3))).to.be.true;
    expect(() => new this.Arr(3).equal(new this.Num(3))).not.to.throw();
    expect(new this.Arr(3).equal(new this.Num(3))).to.be.true;

    expect(() => equal(function (obj) {
      return (this.n[0] || this.n) === (obj.n[0] || obj.n);
    }, this.Arr, this.Num)).to.throw();
  });

  it('Option reciprocal', function () {
    const greater = method('greater', {reciprocal: 'lower'});

    greater(function (obj) {
      return this.n > obj.n;
    }, this.Num);

    greater(function (obj) {
      return this.n.every((a, i) => a > obj.n[i]);
    }, this.Arr);

    expect(new this.Num(6).greater(new this.Num(3))).to.be.true;
    expect(new this.Num(3).greater(new this.Num(3))).to.be.false;

    expect(new this.Arr(6).greater(new this.Arr(3))).to.be.true;
    expect(new this.Arr(3).greater(new this.Arr(3))).to.be.false;

    expect(() => new this.Num(3).greater(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).greater(new this.Num(3))).to.throw();

    greater(function (obj) {
      return (this.n[0] || this.n) > (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).greater(new this.Arr(3))).to.be.false;
    expect(() => new this.Arr(3).greater(new this.Num(3))).to.throw();

    greater(function (obj) {
      return (this.n[0] || this.n) > (obj.n[0] || obj.n);
    }, this.Arr, this.Num);

    expect(new this.Arr(3).greater(new this.Num(3))).to.be.false;

    expect(new this.Num(6).lower(new this.Num(3))).to.be.false;
    expect(new this.Num(3).lower(new this.Num(6))).to.be.true;
    expect(new this.Num(3).lower(new this.Num(3))).to.be.false;

    expect(new this.Arr(6).lower(new this.Arr(3))).to.be.false;
    expect(new this.Arr(3).lower(new this.Arr(6))).to.be.true;
    expect(new this.Arr(3).lower(new this.Arr(3))).to.be.false;

    expect(new this.Num(3).lower(new this.Arr(3))).to.be.false;
    expect(new this.Arr(3).lower(new this.Num(3))).to.be.false;
  });

  it('Option negate', function () {
    const greater = method('greater', {negate: 'lowerOrEqual'});

    greater(function (obj) {
      return this.n > obj.n;
    }, this.Num);

    greater(function (obj) {
      return this.n.every((a, i) => a > obj.n[i]);
    }, this.Arr);

    expect(new this.Num(6).greater(new this.Num(3))).to.be.true;
    expect(new this.Num(3).greater(new this.Num(3))).to.be.false;

    expect(new this.Arr(6).greater(new this.Arr(3))).to.be.true;
    expect(new this.Arr(3).greater(new this.Arr(3))).to.be.false;

    expect(() => new this.Num(3).greater(new this.Arr(3))).to.throw();
    expect(() => new this.Arr(3).greater(new this.Num(3))).to.throw();

    greater(function (obj) {
      return (this.n[0] || this.n) > (obj.n[0] || obj.n);
    }, this.Num, this.Arr);

    expect(new this.Num(3).greater(new this.Arr(3))).to.be.false;
    expect(() => new this.Arr(3).greater(new this.Num(3))).to.throw();

    greater(function (obj) {
      return (this.n[0] || this.n) > (obj.n[0] || obj.n);
    }, this.Arr, this.Num);

    expect(new this.Arr(3).greater(new this.Num(3))).to.be.false;

    expect(new this.Num(6).lowerOrEqual(new this.Num(3))).to.be.false;
    expect(new this.Num(3).lowerOrEqual(new this.Num(6))).to.be.true;
    expect(new this.Num(3).lowerOrEqual(new this.Num(3))).to.be.true;

    expect(new this.Arr(6).lowerOrEqual(new this.Arr(3))).to.be.false;
    expect(new this.Arr(3).lowerOrEqual(new this.Arr(6))).to.be.true;
    expect(new this.Arr(3).lowerOrEqual(new this.Arr(3))).to.be.true;

    expect(new this.Num(3).lowerOrEqual(new this.Arr(3))).to.be.true;
    expect(new this.Arr(3).lowerOrEqual(new this.Num(3))).to.be.true;
  });

  it('Option strict and equal', function () {
  });

  it('Option strict and condition', function () {
  });

  it('Option loose and unequal', function () {
  });

  it('Option loose and condition', function () {
  });

  it('Option reciprocal, negate and strict/equal', function () {
  });
});
