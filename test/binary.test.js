/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import Binary from '../src/binary';

describe('Testing class Binary', function () {
  it('Simple add method', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    function impl (obj) {
      return new Num(this.n + obj.n);
    }

    new Binary('add', impl, Num);

    const a = new Num(17);
    const b = new Num(4);

    expect(() => a.add(b)).not.to.throw();
    expect(() => b.add(a)).not.to.throw();
    expect(a.add(b)).to.be.instanceof(Num);
    expect(a.add(b).n).to.equal(21);
  });

  it('Smart multiply method', function () {
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

    const a = new Num(2);
    const b = new Num(3);
    const o = new Num(1);
    const z = new Num(0);

    expect(a).to.be.instanceof(Num);
    expect(b).to.be.instanceof(Num);
    expect(o).to.be.instanceof(One);
    expect(z).to.be.instanceof(Zero);

    function impl (obj) {
      return new Num(this.n * obj.n);
    }

    function leftIdentity (obj) {
      return obj;
    }

    function rightIdentity () {
      return this;
    }

    new Binary('multiply', impl, Num);
    new Binary('multiply', leftIdentity, Zero);
    new Binary('multiply', rightIdentity, One);

    new Binary('multiply', leftIdentity, Num, Zero);
    new Binary('multiply', rightIdentity, Zero, Num);

    new Binary('multiply', rightIdentity, Num, One);
    new Binary('multiply', leftIdentity, One, Num);

    new Binary('multiply', leftIdentity, One, Zero);
    new Binary('multiply', rightIdentity, Zero, One);

    expect(a.multiply(a).n).to.equal(4);
    expect(a.multiply(a)).to.be.instanceof(Num);

    expect(a.multiply(b).n).to.equal(6);
    expect(a.multiply(b)).to.be.instanceof(Num);

    expect(a.multiply(o).n).to.equal(2);
    expect(a.multiply(o)).to.be.instanceof(Num);

    expect(a.multiply(z).n).to.equal(0);
    expect(a.multiply(z)).to.be.instanceof(Zero);

    expect(b.multiply(a).n).to.equal(6);
    expect(b.multiply(a)).to.be.instanceof(Num);

    expect(b.multiply(b).n).to.equal(9);
    expect(b.multiply(b)).to.be.instanceof(Num);

    expect(b.multiply(o).n).to.equal(3);
    expect(b.multiply(o)).to.be.instanceof(Num);

    expect(b.multiply(z).n).to.equal(0);
    expect(b.multiply(z)).to.be.instanceof(Zero);

    expect(o.multiply(a).n).to.equal(2);
    expect(o.multiply(a)).to.be.instanceof(Num);

    expect(o.multiply(b).n).to.equal(3);
    expect(o.multiply(b)).to.be.instanceof(Num);

    expect(o.multiply(o).n).to.equal(1);
    expect(o.multiply(o)).to.be.instanceof(One);

    expect(o.multiply(z).n).to.equal(0);
    expect(o.multiply(z)).to.be.instanceof(Zero);

    expect(z.multiply(a).n).to.equal(0);
    expect(z.multiply(a)).to.be.instanceof(Zero);

    expect(z.multiply(b).n).to.equal(0);
    expect(z.multiply(b)).to.be.instanceof(Zero);

    expect(z.multiply(o).n).to.equal(0);
    expect(z.multiply(o)).to.be.instanceof(Zero);

    expect(z.multiply(z).n).to.equal(0);
    expect(z.multiply(z)).to.be.instanceof(Zero);
  });
});
