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
    if (Math.abs(now.diff(time, 'hours')) <= 12) {
        return time.from(now);
    }

    // If scheduled for or published on the same day, render the time + Today
    if (time.isSame(now, 'day')) {
        let formatted = time.format(`HH:mm [${utcOffset}] [Today]`);
        return formatted;
    }
    if (time.isSame(now.clone().subtract(1, 'days').startOf('day'), 'day')) {
        return time.format(`HH:mm [${utcOffset}] [Yesterday]`);
    }

    // if scheduled for tomorrow, render the time + tomorrow
    if (time.isSame(now.clone().add(1, 'days').startOf('day'), 'day')) {
        return time.format(`[at] HH:mm [${utcOffset}] [tomorrow]`);
    }
    let format = `[at] HH:mm [${utcOffset}] [on] DD MMM YYYY`;
    return time.format(format);

}
export default class GhFormatReportTimeHelper extends Helper {
    @service settings;

    compute([timeago], options) {
        assert('You must pass a time to the gh-format-report-time helper', timeago);

        return formatReportTime(timeago, Object.assign({}, options, {timezone: this.settings.get('timezone')}));
    }
}
