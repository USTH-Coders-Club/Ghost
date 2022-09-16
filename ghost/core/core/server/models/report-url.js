const _ = require('lodash');
const ghostBookshelf = require('./base');


let ReportUrl;

ReportUrl = ghostBookshelf.Model.extend({ 
    tableName: 'report_url',
     orderDefaultOptions: function orderDefaultOptions() {
        return {
            created_date : 'DESC'
        };
    }
})
module.exports = {
    ReportUrl : ghostBookshelf.model('ReportUrl', ReportUrl)
};   
