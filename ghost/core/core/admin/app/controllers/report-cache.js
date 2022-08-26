import Controller from '@ember/controller';
import classic from 'ember-classic-decorator';
import {DEFAULT_QUERY_PARAMS} from 'ghost-admin/helpers/reset-query-params';
import {action, computed, get} from '@ember/object';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';

const TYPES = [{
    name: 'báo cáo lừa đảo',
    value: 'lừa đảo'
},{
    name: 'báo cáo giả mạo',
    value: 'giả mạo'
},{
    name: 'báo cáo nội dung xấu',
    value: 'nội dung xấu'
},{
    name: 'báo cáo chứa mã đôc',
    value: 'chứa mã độc'
},{
    name: 'báo cáo khác',
    value: 'khác'
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
        this.availableOrders = ORDERS;
        
        this.setProperties(DEFAULT_QUERY_PARAMS.reportcache);
    }
    @alias('model')
        reportcacheInfinityModel;
    
    @computed('type')
    get selectedType() {
        let types = this.availableTypes;
        return types.findBy('value', this.type) || {value: '!unknown'};
    }
    @computed('order')
    get selectedOrder() {
        let orders = this.availableOrders;
        return orders.findBy('value', this.order) || {value: '!unknown'};
    }
}
