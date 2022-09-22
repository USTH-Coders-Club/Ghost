import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Serializer | userscore', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('userscore');

    expect(serializer).to.be.ok;
  });

  it('serializes records', function() {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('userscore', {});

    let serializedRecord = record.serialize();

    expect(serializedRecord).to.be.ok;
  });
});
