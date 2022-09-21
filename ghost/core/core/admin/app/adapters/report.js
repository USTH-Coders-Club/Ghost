import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class report extends ApplicationAdapter {
    buildQuery(store, modelName, options) {
        return options;
    }
}
