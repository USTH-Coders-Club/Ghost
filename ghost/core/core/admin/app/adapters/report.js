import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class Report extends ApplicationAdapter {
    buildQuery(store, modelName, options) {
        return options;
    }
}
