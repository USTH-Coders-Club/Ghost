const tpl = require('@tryghost/tpl');
const errors = require('@tryghost/errors');
const models = require('../../models');
const allowedIncludes = ['id','report_link','type','created_date'];

const messages = {
    reportUrlNotFound: 'Report url not found.'
}

module.exports = {
    docName: 'report_url',
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
            return models.ReportUrl.findPage(frame.options);
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

            return models.ReportUrl.destroy(frame.options)
            .then(() => null) // console error message if not found
            .catch(models.ReportUrl.NotFoundError, () => {
                return Promise.reject(new errors.NotFoundError({
                    message: tpl(messages.reportUrlNotFound)}
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
            return models.ReportUrl.add(frame.data.report_url[0], frame.options);
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
            return models.ReportUrl.edit(frame.data.reporturl[0], frame.options);
        }
    },
    read: {
        options: [
            'include',
            'fields',
            'order'
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
            return models.ReportUrl.findOne(frame.data, frame.options)
                .then((model) => {
                    if (!model) {
                        throw new errors.NotFoundError({
                            message: tpl(messages.reportUrlNotFound)});
                    }
                    return model;
                });
        }
    }

    }


