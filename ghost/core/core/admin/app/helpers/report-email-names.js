import { helper } from '@ember/component/helper';

export default helper(function ReportEmailNames(params/*, hash*/) {
    return (reports?.email || []).join(', ');
});
