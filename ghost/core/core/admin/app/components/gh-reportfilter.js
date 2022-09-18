import Component from '@glimmer/component';
import {get} from '@ember/object';
import {inject as service} from '@ember/service';

export default class GhReportfilterComponent extends Component {
    @service customViews;
    @service feature;
    @service router;

    get showCustomViewManagement() {
        let isAdmin = get(this.args.currentUser || {}, 'isAdmin');
        let onPostsScreen = this.router.currentRouteName === 'report_caches';
        let isDefaultView = this.customViews?.activeView?.isDefault;
        let hasFilter = this.args.selectedType.value
            || this.args.selectedDateRange.value

        return isAdmin && onPostsScreen && !isDefaultView && hasFilter;
    }

    calculateActionsDropdownPosition(trigger, content) {
        let {top, left, width, height} = trigger.getBoundingClientRect();
        // content.firstElementChild is required because we use .dropdown-menu which is absolute positioned
        let {width: contentWidth} = content.firstElementChild.getBoundingClientRect();

        let style = {
            left: left + width - contentWidth,
            top: top + height + 5
        };

        return {style};
    }
}
