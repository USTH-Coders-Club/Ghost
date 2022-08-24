const _ = require('lodash');
const ghostBookshelf = require('./base');
const knex = require('../data/db').knex;
const bookshelf = require('bookshelf')(knex);
const config = require('../../shared/config');
const { models } = require('../services/stripe');

let ReportCache;

ReportCache = ghostBookshelf.Model.extend({ 
    tableName: 'report_cache'
})
module.exports = {
    ReportCache : ghostBookshelf.model('ReportCache', ReportCache)
   
};   
