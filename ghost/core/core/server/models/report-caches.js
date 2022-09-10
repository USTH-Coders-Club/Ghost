const _ = require('lodash');
const ghostBookshelf = require('./base');


let ReportCache;

ReportCache = ghostBookshelf.Model.extend({ 
    tableName: 'report_caches'
})
module.exports = {
    ReportCache : ghostBookshelf.model('ReportCache', ReportCache)
   
};   
