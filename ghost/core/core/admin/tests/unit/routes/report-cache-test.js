import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | report-cache', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:report-cache');
    expect(route).to.be.ok;
  });
});
