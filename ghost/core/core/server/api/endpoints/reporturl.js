const tpl = require('@tryghost/tpl');
const errors = require('@tryghost/errors');
const models = require('../../models');
const allowedIncludes = ['id','url','type','level','created'];


module.exports = {
    docName: 'reporturl',
    browse:{
        options: [
        'include'
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
            return models.ReportUrl.findAll(frame.options);
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
                    message: tpl(messages.reporturlNotFound)}
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
            return models.ReportUrl.add(frame.data.reporturl[0], frame.options);
        }

    }

    }


