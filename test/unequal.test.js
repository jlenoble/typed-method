/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import Unequal from '../src/unequal';

describe('Testing class Unequal', function () {
  it('Simple unequal method', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    function impl (obj) {
      return this.n !== obj.n;
    }

    new Unequal('unequal', impl, Num, Num);

    const a = new Num(17);
    const b = new Num(4);

    expect(a.unequal(b)).to.be.true;
    expect(b.unequal(a)).to.be.true;
    expect(a.unequal(a)).to.be.false;
    expect(b.unequal(b)).to.be.false;
  });

  it('Smart unequal method', function () {
    class Num {
      constructor (n) {
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

    const a = new Num(0);
    const b = new Num(1);
    const o = new One();
    const z = new Zero();

    function unequal (obj) {
      return this.n !== obj.n;
    }

    new Unequal('unequal', unequal, Num);
    new Unequal('unequal', unequal, One);
    new Unequal('unequal', unequal, Zero);
    new Unequal('unequal', unequal, Num, Zero);
    new Unequal('unequal', unequal, Num, One);
    new Unequal('unequal', unequal, One, Zero);

    expect(a.n).to.equal(0);
    expect(b.n).to.equal(1);
    expect(o.n).to.equal(1);
    expect(z.n).to.equal(0);

    expect(a.unequal(a)).to.be.false;
    expect(a.unequal(b)).to.be.true;
    expect(a.unequal(o)).to.be.true;
    expect(a.unequal(z)).to.be.true;

    expect(b.unequal(a)).to.be.true;
    expect(b.unequal(b)).to.be.false;
    expect(b.unequal(o)).to.be.true;
    expect(b.unequal(z)).to.be.true;

    expect(o.unequal(a)).to.be.true;
    expect(o.unequal(b)).to.be.true;
    expect(o.unequal(o)).to.be.false;
    expect(o.unequal(z)).to.be.true;

    expect(z.unequal(a)).to.be.true;
    expect(z.unequal(b)).to.be.true;
    expect(z.unequal(o)).to.be.true;
    expect(z.unequal(z)).to.be.false;
  });
});
