const Joi = require('joi');
const internals = {
  controller: require('./controller')
};

module.exports = [
  {
    method: 'get',
    path: '/',
    handler: internals.controller.list,
    config: {
      description: 'Get items in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'get',
    path: '/{id}',
    handler: internals.controller.get,
    config: {
      description: 'Get an item in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      validate: {
        params: {
          id: Joi.string().required().description('ID of item in')
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'post',
    path: '/',
    handler: internals.controller.create,
    config: {
      description: 'Create a new item in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      validate: {
        payload: {
          item_id: Joi.string().required().description('item in category id'),
          type:Joi.any().valid(['Finished', 'Unfinished']).optional().description('item in type'),
          vendor_id: Joi.string().optional().description('item in vendor name'),
          invoice_no:Joi.string().optional().description('item in invoice no'),
          date: Joi.date().iso().optional().description('Item in date'),
          quantity: Joi.number().optional().description('item in quantity'),
          rate: Joi.string().optional().description('item in rate'),
          discount: Joi.string().optional().description('item in discount'),
          make:Joi.string().optional().description('item in make'),
          notes: Joi.string().optional().description('item in notes'),
          measurements: Joi.string().optional().description('item in measurements')
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'put',
    path: '/{id}',
    handler: internals.controller.update,
    config: {
      description: 'Update an item in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      validate: {
        params: {
          id: Joi.string().required().description('ID of item in')
        },
        payload: {
          item_id: Joi.string().optional().description('item in category id'),
          type:Joi.any().valid(['Finished', 'Unfinished']).optional().description('item in type'),
          vendor_id: Joi.string().optional().description('item in vendor name'),
          invoice_no:Joi.string().optional().description('item in invoice no'),
          date: Joi.date().iso().required().description('Item in date'),
          quality: Joi.number().optional().description('item in quantity'),
          rate: Joi.string().optional().description('item in rate'),
          discount: Joi.string().optional().description('item in discount'),
          make:Joi.string().optional().description('item in make'),
          notes: Joi.string().optional().description('item in notes'),
          measurements: Joi.string().optional().description('item in measurements')
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'put',
    path: '/{id}/serial_nos/{serial_no}/assign',
    handler: internals.controller.assign,
    config: {
      description: 'Update an item in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      validate: {
        params: {
          id: Joi.string().required().description('ID of item in'),
          serial_no: Joi.string().required().description('serial_no of item in')
        },
        payload: {
          process_id: Joi.string().optional().description('process_id to assign')
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'delete',
    path: '/{id}',
    handler: internals.controller.delete,
    config: {
      description: 'Delete an item in',
      notes: 'Returns a JSON response',
      tags: ['api', 'items in'],
      validate: {
        params: {
          id: Joi.string().required().description('ID of item in')
        }
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  }
];
