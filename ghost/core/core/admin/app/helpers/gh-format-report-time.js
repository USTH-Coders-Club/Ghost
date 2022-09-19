import Helper from '@ember/component/helper';
import moment from 'moment';
import {assert} from '@ember/debug';
import {inject as service} from '@ember/service';

export function formatReportTime(timeago, {timezone = 'etc/UTC'}) {

    let time = moment.tz(timeago, timezone);
    let now = moment.tz(moment.utc(), timezone);

    let utcOffset;
    if (time.utcOffset() === 0) {
        utcOffset = '(UTC)';
    } else {
        utcOffset = `(UTC${time.format('Z').replace(/([+-])0/, '$1').replace(/:00/, '')})`;
    }
}
export default class GhFormatReportTimeHelper extends Helper {
    @service settings;

    compute([timeago], options) {
        assert('You must pass a time to the gh-format-post-time helper', timeago);

        return formatReportTime(timeago, Object.assign({}, options, {timezone: this.settings.get('timezone')}));
    }
