/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import Equal from '../src/methods/equal';

describe('Testing class Equal', function () {
  it('Simple equal method', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    function impl (obj) {
      return this.n === obj.n;
    }

    new Equal('equal', impl, Num, Num);

    const a = new Num(17);
    const b = new Num(4);

    expect(a.equal(b)).to.be.false;
    expect(b.equal(a)).to.be.false;
    expect(a.equal(a)).to.be.true;
    expect(b.equal(b)).to.be.true;
  });

  it('Smart equal method', function () {
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

    function equal (obj) {
      return this.n === obj.n;
    }

    new Equal('equal', equal, Num);
    new Equal('equal', equal, One);
    new Equal('equal', equal, Zero);
    new Equal('equal', equal, Num, Zero);
    new Equal('equal', equal, Num, One);
    new Equal('equal', equal, One, Zero);

    expect(a.n).to.equal(0);
    expect(b.n).to.equal(1);
    expect(o.n).to.equal(1);
    expect(z.n).to.equal(0);

    expect(a.equal(a)).to.be.true;
    expect(a.equal(b)).to.be.false;
    expect(a.equal(o)).to.be.false;
    expect(a.equal(z)).to.be.false;

    expect(b.equal(a)).to.be.false;
    expect(b.equal(b)).to.be.true;
    expect(b.equal(o)).to.be.false;
    expect(b.equal(z)).to.be.false;

    expect(o.equal(a)).to.be.false;
    expect(o.equal(b)).to.be.false;
    expect(o.equal(o)).to.be.true;
    expect(o.equal(z)).to.be.false;

    expect(z.equal(a)).to.be.false;
    expect(z.equal(b)).to.be.false;
    expect(z.equal(o)).to.be.false;
    expect(z.equal(z)).to.be.true;
  });
});
