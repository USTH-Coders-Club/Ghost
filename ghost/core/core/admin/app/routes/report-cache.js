import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import {action} from '@ember/object';
import {assign} from '@ember/polyfills';
import {isBlank} from '@ember/utils';
import {inject as service} from '@ember/service';

export default class ReportCacheRoute extends AuthenticatedRoute {
    @service infinity;
    @service router;

    queryParams = {
        type: {refreshModel: true},
        access: {refreshModel: true},        
        order: {refreshModel: true}
    };


    modelName = 'report-cache';
    perPage = 30;

    constructor() {
        super(...arguments);

        // if we're already on this route and we're transiting _to_ this route
        // then the filters are being changed and we shouldn't create a new
        // browser history entry
        // see https://github.com/TryGhost/Ghost/issues/11057
        this.router.on('routeWillChange', (transition) => {
            if (transition.to && (this.routeName === 'report-cache')) {
                let toThisRoute = transition.to.find(route => route.name === this.routeName);
                if (transition.from && transition.from.name === this.routeName && toThisRoute) {
                    transition.method('replace');
                }
            }
        });
    }

    model(params) {
        const user = this.session.user;
        let queryParams = {};
        let filterParams = {tag: params.tag, visibility: params.visibility};
        let paginationParams = {
            perPageParam: 'limit',
            totalPagesParam: 'meta.pagination.pages'
        };

        assign(filterParams, this._getTypeFilters(params.type));

        if (params.type === 'featured') {
            filterParams.featured = true;
        }

        if (user.isAuthor) {
            // authors can only view their own posts
            filterParams.authors = user.slug;
        } else if (user.isContributor) {
            // Contributors can only view their own draft posts
            filterParams.authors = user.slug;
            // filterParams.status = 'draft';
        } else if (params.author) {
            filterParams.authors = params.author;
        }

        let filter = this._filterString(filterParams);
        if (!isBlank(filter)) {
            queryParams.filter = filter;
        }

        if (!isBlank(params.order)) {
            queryParams.order = params.order;
        }

        let perPage = this.perPage;
        let paginationSettings = assign({perPage, startingPage: 1}, paginationParams, queryParams);

        return this.infinity.model(this.modelName, paginationSettings);
    }
    @action
    queryParamsDidChange() {
        // scroll back to the top
        let contentList = document.querySelector('.content-list');
        if (contentList) {
            contentList.scrollTop = 0;
        }

        super.actions.queryParamsDidChange.call(this, ...arguments);
    }
    setupController(controller) {
        super.setupController(...arguments);

        if (!this.session.user.isAuthorOrContributor && !controller._hasLoadedAuthors) {
            this.store.query('user', {limit: 'all'}).then(() => {
                controller._hasLoadedAuthors = true;
            });
        }
    }
    _getTypeFilters(type) {
        let status = '[lừa đảo,giả mạo ,nội dung xấu,chứa mã độc,khác]';

        switch (type) {
        case 'lừa đảo':
            status = 'lừa đảo';
            break;
        case 'giả mạo':
            status = 'nội dung xấu';
            break;
        case 'chứa mã đọc':
            status = 'giả mạo';
            break;
        case 'chứa mã độc':
            status = 'chứa mã độc';
            break;
        case 'khác':
            status = 'khác';
            break;
        }

        return {
            status
        };
    }
    _filterString(filter) {
        return Object.keys(filter).map((key) => {
            let value = filter[key];

            if (!isBlank(value)) {
                return `${key}:${filter[key]}`;
            }
        }).compact().join('+');
    }
}
