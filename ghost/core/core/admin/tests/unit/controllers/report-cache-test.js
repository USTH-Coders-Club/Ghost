import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | report-cache', function() {
  setupTest();

  // TODO: Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:report-cache');
    expect(controller).to.be.ok;
  });
});
