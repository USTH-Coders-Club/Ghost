import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class ReportCachesAdapter extends ApplicationAdapter {
    buildQuery(store, modelName, options) {
        return options;
    }
}
