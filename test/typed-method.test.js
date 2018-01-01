import Muter, {captured} from 'muter';
import {expect} from 'chai';
import TypedMethod from '../src/typed-method';

describe('Testing TypedMethod', function () {
  const muter = Muter(console, 'log'); // eslint-disable-line new-cap

  it(`Class TypedMethod says 'Hello world!'`, captured(muter, function () {
    new TypedMethod();
    expect(muter.getLogs()).to.equal('Hello world!\n');
  }));
});
