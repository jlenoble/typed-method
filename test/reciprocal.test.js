/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import {succeed, fail} from '../src/implementations';
import {Binary, Reciprocal} from '../src/methods';

describe('Testing class Reciprocal', function () {
  it('Simple greater and lower methods', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    function impl (obj) {
      return this.n > obj.n;
    }

    new Binary('greater', impl, Num, Num);
    new Reciprocal('lower', 'greater', Num, Num);

    const a = new Num(17);
    const b = new Num(4);

    expect(() => a.greater(b)).not.to.throw();
    expect(() => b.lower(a)).not.to.throw();
    expect(a.greater(b)).to.be.true;
    expect(a.lower(b)).to.be.false;
    expect(b.greater(a)).to.be.false;
    expect(b.lower(a)).to.be.true;
  });

  it('Smart greater and lower methods', function () {
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

    new Binary('greater', _greater, Num, Num);
    new Binary('greater', succeed, Num, One);
    new Binary('greater', succeed, Num, Zero);
    new Reciprocal('lower', 'greater', Num, Num);
    new Reciprocal('lower', 'greater', Num, One);
    new Reciprocal('lower', 'greater', Num, Zero);

    new Binary('greater', fail, One, Num);
    new Binary('greater', fail, One, One);
    new Binary('greater', succeed, One, Zero);
    new Reciprocal('lower', 'greater', One, Num);
    new Reciprocal('lower', 'greater', One, One);
    new Reciprocal('lower', 'greater', One, Zero);

    new Binary('greater', fail, Zero, Num);
    new Binary('greater', fail, Zero, One);
    new Binary('greater', fail, Zero, Zero);
    new Reciprocal('lower', 'greater', Zero, Num);
    new Reciprocal('lower', 'greater', Zero, One);
    new Reciprocal('lower', 'greater', Zero, Zero);

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

    expect(a.lower(a)).to.be.false;
    expect(a.lower(b)).to.be.false;
    expect(a.lower(o)).to.be.false;
    expect(a.lower(z)).to.be.false;

    expect(b.lower(a)).to.be.true;
    expect(b.lower(b)).to.be.false;
    expect(b.lower(o)).to.be.false;
    expect(b.lower(z)).to.be.false;

    expect(o.lower(a)).to.be.true;
    expect(o.lower(b)).to.be.true;
    expect(o.lower(o)).to.be.false;
    expect(o.lower(z)).to.be.false;

    expect(z.lower(a)).to.be.true;
    expect(z.lower(b)).to.be.true;
    expect(z.lower(o)).to.be.true;
    expect(z.lower(z)).to.be.false;
  });

  it('Smart includes and isIncluded methods', function () {
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

    new Binary('includes', _equals, Num, Num);
    new Binary('includes', fail, Num, Nums);
    new Reciprocal('isIncluded', 'includes', Num, Num);
    new Reciprocal('isIncluded', 'includes', Num, Nums);

    new Binary('includes', _includesAll, Nums, Nums);
    new Binary('includes', _includes, Nums, Num);
    new Reciprocal('isIncluded', 'includes', Nums, Nums);
    new Reciprocal('isIncluded', 'includes', Nums, Num);

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

    expect(a.isIncluded(a)).to.be.true;
    expect(a.isIncluded(b)).to.be.false;
    expect(a.isIncluded(c)).to.be.true;
    expect(a.isIncluded(d)).to.be.false;

    expect(b.isIncluded(a)).to.be.false;
    expect(b.isIncluded(b)).to.be.true;
    expect(b.isIncluded(c)).to.be.true;
    expect(b.isIncluded(d)).to.be.false;

    expect(c.isIncluded(a)).to.be.false;
    expect(c.isIncluded(b)).to.be.false;
    expect(c.isIncluded(c)).to.be.true;
    expect(c.isIncluded(d)).to.be.false;

    expect(d.isIncluded(a)).to.be.false;
    expect(d.isIncluded(b)).to.be.false;
    expect(d.isIncluded(c)).to.be.false;
    expect(d.isIncluded(d)).to.be.true;
  });
});
