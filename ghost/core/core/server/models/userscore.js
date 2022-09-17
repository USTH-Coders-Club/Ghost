const _ = require('lodash');
const ghostBookshelf = require('./base');
const errors = require('@tryghost/errors');

const messages = {
    ThereWasAnEmail : "there was duplicated email" 
}


let UserScore;

UserScore = ghostBookshelf.Model.extend({ 
    tableName: 'user_score',
    orderDefaultOptions: function orderDefaultOptions() {
        return {
            score : 'DESC'
        };
    },
    findOne: function findOne(dataToClone, unfilteredOptions) {
        const options = this.filterOptions(unfilteredOptions, 'findOne');
        let query;
        let data = _.cloneDeep(dataToClone);
        // Ensure only valid fields/columns are added to query
        if (options.columns) {
            options.columns = _.intersection(options.columns, this.prototype.permittedAttributes());
        }
        data = this.filterData(data);
        query = this.forge(data);

        return query.fetch(options);
}})
module.exports = {
    UserScore : ghostBookshelf.model('UserScore', UserScore),
};   
