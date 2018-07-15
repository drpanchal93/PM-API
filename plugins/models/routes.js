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
      description: 'Get Models',
      notes: 'Returns a JSON response',
      tags: ['api', 'Models'],
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
      description: 'Get an Model',
      notes: 'Returns a JSON response',
      tags: ['api', 'Models'],
      validate: {
        params: {
          no: Joi.string().required().description('ID of the Model')
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
      description: 'Create a new Model',
      notes: 'Returns a JSON response',
      tags: ['api', 'Models'],
      validate: {
        payload: {
          no: Joi.string().required().description('ID of the Model'),
          name: Joi.string().required().description('Name of the Model')
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
      description: 'Update an Model',
      notes: 'Returns a JSON response',
      tags: ['api', 'Models'],
      validate: {
        params: {
          no: Joi.string().required().description('ID of the Model')
        },
        payload: {
          name: Joi.string().optional().description('Name of the Model')
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
      description: 'Delete an Model',
      notes: 'Returns a JSON response',
      tags: ['api', 'Models'],
      validate: {
        params: {
          no: Joi.string().required().description('ID of the Model')
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
