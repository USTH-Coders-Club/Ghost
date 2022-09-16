import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class ReportUrlAdapter extends ApplicationAdapter {
    buildQuery(store, modelName, options) {
        return options;
    }
}
