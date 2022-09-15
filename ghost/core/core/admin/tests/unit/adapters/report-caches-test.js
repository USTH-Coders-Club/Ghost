import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Adapter | report caches', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let adapter = this.owner.lookup('adapter:report-caches');
    expect(adapter).to.be.ok;
  });
});
