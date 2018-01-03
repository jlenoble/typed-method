/* eslint-disable no-invalid-this */
import {expect} from 'chai';
import {Method} from '../src/methods';

describe('Testing class Method', function () {
  it('Simple add method', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    function impl (obj) {
      return new Num(this.n + obj.n);
    }

    new Method('add', impl, Num, Num);

    const a = new Num(17);
    const b = new Num(4);

    expect(() => a.add(b)).not.to.throw();
    expect(() => b.add(a)).not.to.throw();
    expect(a.add(b)).to.be.instanceof(Num);
    expect(a.add(b).n).to.equal(21);
  });

  it('Multiple addition method', function () {
    class Num {
      constructor (n) {
        this.n = n;
      }
    }

    const a = new Num(2);
    const b = new Num(3);

    new Method('add', function (obj) {
      return new Num(this.n + obj.n);
    }, Num, Num);

    expect(a.add(b).n).to.equal(5);
    expect(a.add(a).n).to.equal(4);

    expect(() => a.add(a, b)).to.throw();

    expect(() => new Method('add', function (obj) {
      return new Num(this.n + obj.n);
    }, Num, Num)).to.throw(`Method 'add' already defined`);

    expect(() => new Method('add', function (obj1, obj2) {
      return new Num(this.n + obj1.n + obj2.n);
    }, Num, Num, Num)).not.to.throw();

    expect(a.add(a, a).n).to.equal(6);
    expect(a.add(a).n).to.equal(4);

    expect(() => a.add(b, a, a)).to.throw();

    expect(() => new Method('add', function (obj1, obj2, obj3) {
      return new Num(this.n + obj1.n + obj2.n + obj3.n);
    }, Num, Num, Num, Num)).not.to.throw();

    expect(a.add(b, a, a).n).to.equal(9);
    expect(a.add(a, a).n).to.equal(6);
    expect(a.add(a).n).to.equal(4);

    expect(() => a.add(b, b, b, a)).throw();
  });
});
