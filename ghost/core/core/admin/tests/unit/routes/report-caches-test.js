import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | reports', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:report-caches');
    expect(route).to.be.ok;
  });
});
