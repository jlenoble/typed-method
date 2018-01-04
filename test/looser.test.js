/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import {succeed, fail} from '../src/implementations';
import {Binary, Equal, Looser} from '../src/methods';

describe('Testing class Looser', function () {
  it('Smart greaterOrEqual from greater and equal methods', function () {
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

    function _greater (obj) {
      return this.n > obj.n;
    }

    function _equal (obj) {
      return this.n === obj.n;
    }

    new Binary('greater', _greater, Num, Num);
    new Binary('greater', succeed, Num, One);
    new Binary('greater', succeed, Num, Zero);
    new Equal('equal', _equal, Num, Num);
    new Equal('equal', fail, Num, One);
    new Equal('equal', fail, Num, Zero);
    new Looser('greaterOrEqual', 'greater', 'equal', Num, Num);
    new Looser('greaterOrEqual', 'greater', 'equal', Num, One);
    new Looser('greaterOrEqual', 'greater', 'equal', Num, Zero);

    new Binary('greater', fail, One, Num);
    new Binary('greater', fail, One, One);
    new Binary('greater', succeed, One, Zero);
    new Equal('equal', succeed, One, One);
    new Equal('equal', fail, One, Zero);
    new Looser('greaterOrEqual', 'greater', 'equal', One, Num);
    new Looser('greaterOrEqual', 'greater', 'equal', One, One);
    new Looser('greaterOrEqual', 'greater', 'equal', One, Zero);

    new Binary('greater', fail, Zero, Num);
    new Binary('greater', fail, Zero, One);
    new Binary('greater', fail, Zero, Zero);
    new Equal('equal', succeed, Zero, Zero);
    new Looser('greaterOrEqual', 'greater', 'equal', Zero, Num);
    new Looser('greaterOrEqual', 'greater', 'equal', Zero, One);
    new Looser('greaterOrEqual', 'greater', 'equal', Zero, Zero);

    expect(a.greaterOrEqual(a)).to.be.true;
    expect(a.greaterOrEqual(b)).to.be.true;
    expect(a.greaterOrEqual(o)).to.be.true;
    expect(a.greaterOrEqual(z)).to.be.true;

    expect(b.greaterOrEqual(a)).to.be.false;
    expect(b.greaterOrEqual(b)).to.be.true;
    expect(b.greaterOrEqual(o)).to.be.true;
    expect(b.greaterOrEqual(z)).to.be.true;

    expect(o.greaterOrEqual(a)).to.be.false;
    expect(o.greaterOrEqual(b)).to.be.false;
    expect(o.greaterOrEqual(o)).to.be.true;
    expect(o.greaterOrEqual(z)).to.be.true;

    expect(z.greaterOrEqual(a)).to.be.false;
    expect(z.greaterOrEqual(b)).to.be.false;
    expect(z.greaterOrEqual(o)).to.be.false;
    expect(z.greaterOrEqual(z)).to.be.true;
  });
});
