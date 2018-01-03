/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import {succeed, fail} from '../src/implementations';
import {Negate} from '../src/methods';

describe('Testing class Negate', function () {
  it('Smart greater and lowerOrEqual methods', function () {
    class Num {
      constructor (n) {
        if (n === 0) {
          return new Zero();
        }

        if (n === 1) {
          return new One();
        }

        this.n = n;
      }
    }

    class Zero {
      constructor () {
        this.n = 0;
      }
    }
    class One {
      constructor () {
        this.n = 1;
      }
    }

    const a = new Num(3);
    const b = new Num(2);
    const o = new Num(1);
    const z = new Num(0);

    expect(a).to.be.instanceof(Num);
    expect(b).to.be.instanceof(Num);
    expect(o).to.be.instanceof(One);
    expect(z).to.be.instanceof(Zero);

    function _greater (obj) {
      return this.n > obj.n;
    }

    new Negate('greater', 'lowerOrEqual', _greater, Num, Num);
    new Negate('greater', 'lowerOrEqual', succeed, Num, One);
    new Negate('greater', 'lowerOrEqual', succeed, Num, Zero);

    new Negate('greater', 'lowerOrEqual', fail, One, Num);
    new Negate('greater', 'lowerOrEqual', fail, One, One);
    new Negate('greater', 'lowerOrEqual', succeed, One, Zero);

    new Negate('greater', 'lowerOrEqual', fail, Zero, Num);
    new Negate('greater', 'lowerOrEqual', fail, Zero, One);
    new Negate('greater', 'lowerOrEqual', fail, Zero, Zero);

    expect(a.greater(a)).to.be.false;
    expect(a.greater(b)).to.be.true;
    expect(a.greater(o)).to.be.true;
    expect(a.greater(z)).to.be.true;

    expect(b.greater(a)).to.be.false;
    expect(b.greater(b)).to.be.false;
    expect(b.greater(o)).to.be.true;
    expect(b.greater(z)).to.be.true;

    expect(o.greater(a)).to.be.false;
    expect(o.greater(b)).to.be.false;
    expect(o.greater(o)).to.be.false;
    expect(o.greater(z)).to.be.true;

    expect(z.greater(a)).to.be.false;
    expect(z.greater(b)).to.be.false;
    expect(z.greater(o)).to.be.false;
    expect(z.greater(z)).to.be.false;

    expect(a.lowerOrEqual(a)).to.be.true;
    expect(a.lowerOrEqual(b)).to.be.false;
    expect(a.lowerOrEqual(o)).to.be.false;
    expect(a.lowerOrEqual(z)).to.be.false;

    expect(b.lowerOrEqual(a)).to.be.true;
    expect(b.lowerOrEqual(b)).to.be.true;
    expect(b.lowerOrEqual(o)).to.be.false;
    expect(b.lowerOrEqual(z)).to.be.false;

    expect(o.lowerOrEqual(a)).to.be.true;
    expect(o.lowerOrEqual(b)).to.be.true;
    expect(o.lowerOrEqual(o)).to.be.true;
    expect(o.lowerOrEqual(z)).to.be.false;

    expect(z.lowerOrEqual(a)).to.be.true;
    expect(z.lowerOrEqual(b)).to.be.true;
    expect(z.lowerOrEqual(o)).to.be.true;
    expect(z.lowerOrEqual(z)).to.be.true;
  });

  it('Smart includes and includedNot methods', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    class Nums {
      constructor (...n) {
        if (n.length === 1) {
          return new Num(n[0]);
        }
        this.n = n;
      }
    }

    const a = new Nums(3);
    const b = new Nums(2);
    const c = new Nums(1, 2, 3);
    const d = new Nums(4, 5);

    expect(a).to.be.instanceof(Num);
    expect(b).to.be.instanceof(Num);
    expect(c).to.be.instanceof(Nums);
    expect(d).to.be.instanceof(Nums);

    function _equals (obj) {
      return this.n === obj.n;
    }

    function _includes (obj) {
      return this.n.indexOf(obj.n) !== -1;
    }

    function _includesAll (obj) {
      return obj.n.every(n => this.n.indexOf(n) !== -1);
    }

    new Negate('includes', 'includesNot', _equals, Num, Num);
    new Negate('includes', 'includesNot', fail, Num, Nums);

    new Negate('includes', 'includesNot', _includesAll, Nums, Nums);
    new Negate('includes', 'includesNot', _includes, Nums, Num);

    expect(a.includes(a)).to.be.true;
    expect(a.includes(b)).to.be.false;
    expect(a.includes(c)).to.be.false;
    expect(a.includes(d)).to.be.false;

    expect(b.includes(a)).to.be.false;
    expect(b.includes(b)).to.be.true;
    expect(b.includes(c)).to.be.false;
    expect(b.includes(d)).to.be.false;

    expect(c.includes(a)).to.be.true;
    expect(c.includes(b)).to.be.true;
    expect(c.includes(c)).to.be.true;
    expect(c.includes(d)).to.be.false;

    expect(d.includes(a)).to.be.false;
    expect(d.includes(b)).to.be.false;
    expect(d.includes(c)).to.be.false;
    expect(d.includes(d)).to.be.true;

    expect(a.includesNot(a)).to.be.false;
    expect(a.includesNot(b)).to.be.true;
    expect(a.includesNot(c)).to.be.true;
    expect(a.includesNot(d)).to.be.true;

    expect(b.includesNot(a)).to.be.true;
    expect(b.includesNot(b)).to.be.false;
    expect(b.includesNot(c)).to.be.true;
    expect(b.includesNot(d)).to.be.true;

    expect(c.includesNot(a)).to.be.false;
    expect(c.includesNot(b)).to.be.false;
    expect(c.includesNot(c)).to.be.false;
    expect(c.includesNot(d)).to.be.true;

    expect(d.includesNot(a)).to.be.true;
    expect(d.includesNot(b)).to.be.true;
    expect(d.includesNot(c)).to.be.true;
    expect(d.includesNot(d)).to.be.false;
  });
});
