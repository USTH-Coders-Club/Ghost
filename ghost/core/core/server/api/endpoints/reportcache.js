const tpl = require('@tryghost/tpl');
const errors = require('@tryghost/errors');
const models = require('../../models');
const allowedIncludes = ['id','title','report_link','type','content','created_date'];


module.exports = {
    docName: 'reportcache',
    browse:{
        options: [
        'include',   
        'order',
        'fields',
        'limit',
        'page'
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
            return models.ReportCache.findPage(frame.options);
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

            return models.ReportCache.destroy(frame.options)
            .then(() => null) // console error message if not found
            .catch(models.ReportCache.NotFoundError, () => {
                return Promise.reject(new errors.NotFoundError({
                    message: tpl(messages.reportcacheNotFound)}
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
            return models.ReportCache.add(frame.data.reportcache[0], frame.options);
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
            return models.ReportCache.edit(frame.data.reportcache[0], frame.options);
        }
    },
    read: {
        options: [
            'include',
            'fields'
        ],
        data: [
            'id'
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
            return models.ReportCache.findOne(frame.data, frame.options)
                .then((model) => {
                    if (!model) {
                        throw new errors.NotFoundError();
                    }
                    return model;
                });
        }
    }

    }


