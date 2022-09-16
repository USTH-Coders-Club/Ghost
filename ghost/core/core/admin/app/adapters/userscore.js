import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class UserscoreAdapter extends ApplicationAdapter {
    queryemail(store, type, query) {
        let email;

        if (query.email) {
            email = query.email;
            delete query.email;
        }

        return this.ajax(this.buildURL(type.modelName, email), 'GET', {data: query});
    }
    queryRecord(store, type, query) {
        if (query && query.id) {
            let {id} = query;
            delete query.id;
            let url = this.buildURL(type.modelName, id, query, 'findRecord');
            return this.ajax(url, 'GET', {data: query});
        }

        return super.queryRecord(...arguments);
    }
    queryEmailRecord(store, type, query) {
        if (query && query.email) {
            let {email} = query;
            delete query.email;
            let url = this.buildURL(type.modelName, email, query, 'findRecord');
            return this.ajax(url, 'GET', {data: query});
        }
    }

}
