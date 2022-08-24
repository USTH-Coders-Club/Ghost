const _ = require('lodash');
const ghostBookshelf = require('./base');


let ReportCache;

ReportCache = ghostBookshelf.Model.extend({ 
    tableName: 'report_cache'
})
module.exports = {
    ReportCache : ghostBookshelf.model('ReportCache', ReportCache)
   
};   
