/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import {succeed, fail} from '../src/implementations';
import {Binary, Unequal, Stricter} from '../src/methods';

describe('Testing class Stricter', function () {
  it('Smart greater from greaterOrEqual and unequal methods', function () {
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

    function _greaterOrEqual (obj) {
      return this.n >= obj.n;
    }

    function _unequal (obj) {
      return this.n !== obj.n;
    }

    new Binary('greaterOrEqual', _greaterOrEqual, Num, Num);
    new Binary('greaterOrEqual', succeed, Num, One);
    new Binary('greaterOrEqual', succeed, Num, Zero);
    new Unequal('unequal', _unequal, Num, Num);
    new Unequal('unequal', succeed, Num, One);
    new Unequal('unequal', succeed, Num, Zero);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Num, Num);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Num, One);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Num, Zero);

    new Binary('greaterOrEqual', fail, One, Num);
    new Binary('greaterOrEqual', succeed, One, One);
    new Binary('greaterOrEqual', succeed, One, Zero);
    new Unequal('unequal', fail, One, One);
    new Unequal('unequal', succeed, One, Zero);
    new Stricter('greater', 'greaterOrEqual', 'unequal', One, Num);
    new Stricter('greater', 'greaterOrEqual', 'unequal', One, One);
    new Stricter('greater', 'greaterOrEqual', 'unequal', One, Zero);

    new Binary('greaterOrEqual', fail, Zero, Num);
    new Binary('greaterOrEqual', fail, Zero, One);
    new Binary('greaterOrEqual', succeed, Zero, Zero);
    new Unequal('unequal', fail, Zero, Zero);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Zero, Num);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Zero, One);
    new Stricter('greater', 'greaterOrEqual', 'unequal', Zero, Zero);

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
  });
});
