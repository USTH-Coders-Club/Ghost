import Controller from '@ember/controller';
import classic from 'ember-classic-decorator';
import {DEFAULT_QUERY_PARAMS} from 'ghost-admin/helpers/reset-query-params';
import {action, computed, get} from '@ember/object';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';

const TYPES = [{
    name: 'Tất cả',
    value: null
},{
    name: 'Lừa đảo',
    value: 'scam'
},{
    name: 'Giả mạo',
    value: 'phishing'
},{
    name: 'Mạo danh',
    value: 'impersonate_fake'
},{
    name: 'Nội dung xấu',
    value: 'bad_sensitive_content'
},{
    name: 'Chứa mã độc',
    value: 'dangerous_link'
},{
    name: 'Khác',
    value: 'other'
}];

const DATERANGES = [{
    name: 'Newest',
    value: null
}, {
    name: 'Oldest',
    value: 'oldest'
}, {
    name: 'Recently updated',
    value: 'recent'
}, {
    name: 'Last week',
    value: 'week'
}, {
    name: 'Last month',
    value: 'month'
}];
@classic
export default class ReportCacheController extends Controller {
    @service feature;
    @service session;
    @service store;
    @service settings;
    @service config;
    queryParams = ['type', 'date_range'];

    availableTypes = null;
    availableDateRanges = null;

    init() {
        super.init(...arguments);
        this.availableTypes = TYPES;
        this.availableDateRanges = DATERANGES;
        
        this.setProperties(DEFAULT_QUERY_PARAMS.report_caches);
    }

    @alias('model')
        reportcacheInfinityModel;
    

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

    /**
     * 
     * @param {*} reportcache 
     * @note save report to db and 
     */
    @action
    saveReport(reportcache){

    }
}
