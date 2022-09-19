import { helper } from '@ember/component/helper';

export default helper(function reportEmailNames(params/*, hash*/) {
    return (report_caches?.email || []).join(', ');
});
