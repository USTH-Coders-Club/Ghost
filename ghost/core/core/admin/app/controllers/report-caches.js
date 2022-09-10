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

const ACCESS = [{
    name: 'Default',
    value: null
}];

const ORDERS = [{
    name: 'Newest',
    value: null
}, {
    name: 'Oldest',
    value: 'published_at asc'
}, {
    name: 'Recently updated',
    value: 'updated_at desc'
}];
@classic
export default class ReportCacheController extends Controller {
    @service feature;
    @service session;
    @service store;
    @service settings;
    @service config;
    queryParams = ['type', 'access', 'order'];

    availableTypes = null;
    
    availableOrders = null;
    init() {
        super.init(...arguments);
        this.availableTypes = TYPES;
        this.availableAccess = ACCESS;
        this.availableOrders = ORDERS;
        
        this.setProperties(DEFAULT_QUERY_PARAMS.report_caches);
    }

    @alias('model')
        reportcacheInfinityModel;
    

    @computed('type')
    get selectedType() {
        let types = this.availableTypes;
        return types.findBy('value', this.type) || {value: '!unknown'};
    }

    @computed('type')
    get selectedAccess() {
        let accesses = this.availableAccess;
        return accesses.findBy('value', this.type) || {value: '!unknown'};
    }

    @computed('order')
    get selectedOrder() {
        let orders = this.availableOrders;
        return orders.findBy('value', this.order) || {value: '!unknown'};
    }

    @action
    changeType(type) {
        this.set('type', get(type, 'value'));
    }

    @action
    changeAccess(access) {
        this.set('access', get(access, 'value'));
    }

    @action
    changeOrder(order) {
        this.set('order', get(order, 'value'));
    }
}
