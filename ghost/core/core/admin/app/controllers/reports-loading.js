import Controller, {inject as controller} from '@ember/controller';
import classic from 'ember-classic-decorator';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';

/* eslint-disable ghost/ember/alias-model-in-controller */
@classic
export default class ReportsLoadingController extends Controller {
    @controller('reports')
        reportsController;

    @service session;
    @service ui;
    @service config;

    @readOnly('reportsController.availableTypes')
        availableTypes;

    @readOnly('reportsController.selectedType')
        selectedType;

    @readOnly('reportsController.selectedDateRange')
        selectedDateRange;

    @readOnly('reportsController.availableDateRanges')
        availableDateRanges;
}
