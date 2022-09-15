import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | report-caches-loading', function() {
  setupTest();

  // TODO: Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:report-caches-loading');
    expect(controller).to.be.ok;
  });
});
