// external
import { expect } from 'chai';

// global
import { TEST } from '../index';

describe('sample', () => {
  it('sample test', () => {
    expect(Object.keys(TEST).length).to.equal(0);
  });
});
