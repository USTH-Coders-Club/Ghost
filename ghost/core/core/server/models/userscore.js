const _ = require('lodash');
const ghostBookshelf = require('./base');
const errors = require('@tryghost/errors');


let UserScore;

UserScore = ghostBookshelf.Model.extend({ 
    tableName: 'user_score'
})
module.exports = {
    UserScore : ghostBookshelf.model('UserScore', UserScore),
};   
