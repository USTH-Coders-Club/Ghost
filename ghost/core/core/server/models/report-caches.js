const _ = require('lodash');
const ghostBookshelf = require('./base');


let report;

report = ghostBookshelf.Model.extend({
    tableName: 'report_caches',
    orderDefaultOptions: function orderDefaultOptions() {
        return {
            created_date : 'DESC'
        };
    }
})
module.exports = {
    report : ghostBookshelf.model('report', report)

};
