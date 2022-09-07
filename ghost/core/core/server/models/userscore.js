const _ = require('lodash');
const ghostBookshelf = require('./base');
const errors = require('@tryghost/errors');


let UserScore;

UserScore = ghostBookshelf.Model.extend({ 
    tableName: 'user_score',
   
    increment : async function increment(data, unfilteredOptions) {
        const options = this.filterOptions(unfilteredOptions, 'increment');
        const email = options.email;
        const model = this.forge({email: email});
        
        data = this.filterData(data);
        const object = await model.fetch(options);
            if (object) {
                options.method = 'update';
                data.userscore[0].score = data.userscore[0].score  + 1
                return object.save(data, options);
            }

            throw new errors.NotFoundError();
    }
})
module.exports = {
    UserScore : ghostBookshelf.model('UserScore', UserScore),
};   
