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
      description: 'Get Vendors',
      notes: 'Returns a JSON response',
      tags: ['api', 'Vendors'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      }
    }
  },
  {
    method: 'get',
    path: '/{no}',
    handler: internals.controller.get,
    config: {
      description: 'Get an Vendor',
      notes: 'Returns a JSON response',
      tags: ['api', 'Vendors'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Vendor')
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
      description: 'Create a new Vendor',
      notes: 'Returns a JSON response',
      tags: ['api', 'Vendors'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name of the Vendor')
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
    path: '/{no}',
    handler: internals.controller.update,
    config: {
      description: 'Update an Vendor',
      notes: 'Returns a JSON response',
      tags: ['api', 'Vendors'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Vendor')
        },
        payload: {
          name: Joi.string().optional().description('Name of the Vendor')
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
    path: '/{no}',
    handler: internals.controller.delete,
    config: {
      description: 'Delete an Vendor',
      notes: 'Returns a JSON response',
      tags: ['api', 'Vendors'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Vendor')
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
