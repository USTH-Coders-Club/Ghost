const _ = require('lodash');
const ghostBookshelf = require('./base');


let ReportCache;

ReportCache = ghostBookshelf.Model.extend({ 
    tableName: 'report_caches',
    orderDefaultOptions: function orderDefaultOptions() {
        return {
            created_date : 'DESC'
        };
    }
})
module.exports = {
    ReportCache : ghostBookshelf.model('ReportCache', ReportCache)
   
};   
