import Controller, {inject as controller} from '@ember/controller';
import classic from 'ember-classic-decorator';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';
@classic
export default class ReportCachesLoadingController extends Controller {
    @controller('report-caches')
        ReportCacheController;

    @service session;
    @service ui;
    @service config;

    @readOnly('ReportCacheController.availableTypes')
        availableTypes;

    @readOnly('ReportCacheController.selectedType')
        selectedType;

    @readOnly('ReportCacheController.availableOrders')
        availableOrders;

    @readOnly('ReportCacheController.selectedOrder')
        selectedOrder;
}
