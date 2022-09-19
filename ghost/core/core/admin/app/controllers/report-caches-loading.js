import Controller, {inject as controller} from '@ember/controller';
import classic from 'ember-classic-decorator';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';

/* eslint-disable ghost/ember/alias-model-in-controller */
@classic
export default class ReportCachesLoadingController extends Controller {
    @controller('report_caches')
        reportCachesController;

    @service session;
    @service ui;
    @service config;

    @readOnly('reportCachesController.availableTypes')
        availableTypes;

    @readOnly('reportCachesController.selectedType')
        selectedType;

    @readOnly('reportCachesController.selectedDateRange')
        selectedDateRange;

    @readOnly('reportCachesController.availableDateRanges')
        availableDateRanges;
}
