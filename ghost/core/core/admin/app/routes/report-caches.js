import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import {action, computed, get} from '@ember/object';
import {alias} from '@ember/object/computed';
import {assign} from '@ember/polyfills';
import {isBlank} from '@ember/utils';
import {inject as service} from '@ember/service';

export default class ReportCachesRoute extends AuthenticatedRoute {
    @service infinity;
    @service router;
    @service store;

    queryParams = {
        type: {refreshModel: true},
        date_range: {refreshModel: true},
    };

    modelName = 'report_caches';
    perPage = 30;

    constructor() {
        super(...arguments);

        // if we're already on this route and we're transiting _to_ this route
        // then the filters are being changed and we shouldn't create a new
        // browser history entry
        // see https://github.com/TryGhost/Ghost/issues/11057
        this.router.on('routeWillChange', (transition) => {
            if (transition.to && (this.routeName === 'report_caches')) {
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
        let filterParams = {type: params.type, date_range: params.date_range};
        let paginationParams = {
            perPageParam: 'limit',
            totalPagesParam: 'meta.pagination.pages'
        };

        assign(filterParams, this._getTypeFilters(params.type));
        assign(filterParams, params.date_range);

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

    // trigger a background load of all tags, authors, and snipps for use in filter dropdowns and card menu
    setupController(controller) {
        super.setupController(...arguments);

        if (!this.session.user.isAuthorOrContributor && !controller._hasLoadedTypes) {
            this.store.query('type', {limit: 'all'}).then(() => {
                controller._hasLoadedTypes = true;
            });
        }

        if (!this.session.user.isAuthorOrContributor && !controller._hasLoadedDateRanges) {
            this.store.query('date_range', {limit: 'all'}).then(() => {
                controller._hasLoadedDateRanges = true;
            });
        }
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

    buildRouteInfoMetadata() {
        return {
            titleToken: 'Reports'
        };
    }

    _getTypeFilters(type) {
        let status = '[scam,phishing,impersonate_fake,bad_sensitive_content,dangerous_link,other]';

        switch (type) {
        case 'scam':
            status = 'scam';
            break;
        case 'phishing':
            status = 'phishing';
            break;
        case 'impersonate_fake':
            status = 'impersonate_fake';
            break;
        case 'bad_sensitive_content':
            status = 'bad_sensitive_content';
            break;
        case 'dangerous_link':
            status = 'dangerous_link';
            break;
        case 'other':
            status = 'other';
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
