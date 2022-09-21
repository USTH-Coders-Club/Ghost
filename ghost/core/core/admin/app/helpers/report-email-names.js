import { helper } from '@ember/component/helper';

export default helper(function reportEmailNames(params/*, hash*/) {
    return (reports?.type || []).join(', ');
});
