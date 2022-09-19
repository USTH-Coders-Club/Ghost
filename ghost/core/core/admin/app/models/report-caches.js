import Ember from 'ember';
import Model, {attr, belongsTo, hasMany} from '@ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';
import boundOneWay from 'ghost-admin/utils/bound-one-way';
import moment from 'moment';
import {compare, isBlank} from '@ember/utils';
// eslint-disable-next-line ghost/ember/no-observers
import {BLANK_DOC} from 'koenig-editor/components/koenig-editor';
import {computed, observer} from '@ember/object';
import {equal, filterBy, reads} from '@ember/object/computed';
import {on} from '@ember/object/evented';
import {inject as service} from '@ember/service';
const {Comparable} = Ember;
export default Model.extend(Comparable, ValidationEngine,{
    config: service(),
    feature: service(),
    ghostPaths: service(),
    clock: service(),
    settings: service(),
    displayName: 'report_caches',
    validationType: 'report_caches',
    id: attr('string'),
    report_link: attr('string'),
    email: attr('string'),
    content: attr('string'),
    type: attr('string'),
    created_date: attr('moment'),
});
