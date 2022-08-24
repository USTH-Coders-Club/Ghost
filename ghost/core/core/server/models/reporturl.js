const _ = require('lodash');
const ghostBookshelf = require('./base');


let ReportUrl;

ReportUrl = ghostBookshelf.Model.extend({ 
    tableName: 'report_url'
})
module.exports = {
    ReportUrl : ghostBookshelf.model('ReportUrl', ReportUrl)
   
};   
