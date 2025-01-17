import Controller from '@ember/controller';
import classic from 'ember-classic-decorator';
import {DEFAULT_QUERY_PARAMS} from 'ghost-admin/helpers/reset-query-params';
import {action, computed, get} from '@ember/object';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

const TYPES = [{
    name: 'All',
    value: null
},{
    name: 'Scam',
    value: 'scam'
},{
    name: 'Phishing',
    value: 'phishing'
},{
    name: 'Impersonate - Fake',
    value: 'impersonate_fake'
},{
    name: 'Bad - Sensitive',
    value: 'bad_sensitive_content'
},{
    name: 'Dangerous',
    value: 'dangerous_link'
},{
    name: 'Other',
    value: 'other'
}];

const DATERANGES = [{
    name: 'Newest',
    value: null
}, {
    name: 'Oldest',
    value: 'oldest'
}, {
    name: 'Recent',
    value: 'recent'
}, {
    name: 'Last week',
    value: 'week'
}, {
    name: 'Last month',
    value: 'month'
}];
@classic
export default class ReportController extends Controller {
    @service feature;
    @service session;
    @service store;
    @service settings;
    @service config;
    @service notifications;

    queryParams = ['type', 'date_range'];

    _hasLoadedTypes = false;
    _hasLoadedDateRanges = false;

    availableTypes = null;
    availableDateRanges = null;

    init() {
        super.init(...arguments);
        this.availableTypes = TYPES;
        this.availableDateRanges = DATERANGES;

        this.setProperties(DEFAULT_QUERY_PARAMS.reports);
    }

    @alias('model')
        reportsInfinityModel;

    @computed('type', 'date_range')
    get showingAll() {
        let {type, date_range} = this;

        return !type && !date_range;
    }

    @computed('type')
    get selectedType() {
        let types = this.availableTypes;
        return types.findBy('value', this.type) || {value: '!unknown'};
    }

    @computed('date_range')
    get selectedDateRange() {
        let date_ranges = this.availableDateRanges;
        return date_ranges.findBy('value', this.date_range) || {value: '!unknown'};
    }

    @action
    changeType(type) {
        this.set('type', get(type, 'value'));
    }

    @action
    changeDateRange(date_range) {
        this.set('date_range', get(date_range, 'value'));
    }

    @action
    approve() {
        this.approveTaskPointer.perform();
    }

    @action
    decline() {
        this.declineTaskPointer.perform();
    }

    @task(function* () {
          let {report} = this.args;
          try{
          yield report.destroyRecord()
          yield timeout(1000)
          alert("succesfully")
          this.isExisted = false;
          this.notifications.showAlert("successfully add report url");
        } catch(error){
          this.notifications.showAlert("failed to add report url");
        }

      })
          deleteReport;
}
