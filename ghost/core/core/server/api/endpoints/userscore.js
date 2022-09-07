const tpl = require('@tryghost/tpl');
const errors = require('@tryghost/errors');
const models = require('../../models');
const allowedIncludes = ['id','email','score'];


module.exports = {
    docName: 'userscore',
    browse:{
        options: [
        'include',
        'order'
    ],
    validation: {
        options: {
            include: {
                values: allowedIncludes
            }
        }
    },
    permissions: false,
        query(frame) {
            return models.UserScore.findPage(frame.options);
            }
    },
    destroy:{
        statusCode: 204,
        options: [
            'include',
            'id'
        ],
        validation: {
            options: {
                include: {values: allowedIncludes},
                
                id: {
                    required: true
                }
            }
        },
        permissions:false,
        query(frame) {
            frame.options.require = true;
            return models.UserScore.destroy(frame.options)
            .then(() => null) // console error message if not found
            .catch(models.UserScore.NotFoundError, () => {
                return Promise.reject(new errors.NotFoundError(
                 ))}
                 );
         }
    },
    add:{
        statusCode: 201,
        headers: {},
        options: [
            'include'
        ],
        validation: {
            options: {
                include: {
                    values: allowedIncludes
                },
            }
        },
        permissions:false
        ,
        query(frame) {
            return models.UserScore.add(frame.data.userscore[0], frame.options);
        }

    },
    edit:{
        header:{},
        options: [
            'include',
            'id'
        ],
        validation: {
            options: {
                include: {
                    values: allowedIncludes
                },
                id: {
                    required: true
                }
            }
        },
        permissions:false,
        async query(frame) {
            return models.UserScore.edit(frame.data.userscore[0], frame.options);
        }
    },
    read: {
        options: [
            'include',
            'fields',

        ],
        data: [
            'id',
            'email'
        ],
        validation: {
            options: {
                include: {
                    values: allowedIncludes
                }
            }
        },
        permissions : false,
        
        query(frame) {
            return models.UserScore.findOne(frame.data, frame.options)
                .then((model) => {
                    if (!model) {
                        throw new errors.NotFoundError();
                    }
                    return model;
                });
        }
    }
}

