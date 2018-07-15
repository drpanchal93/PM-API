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
      description: 'Get Processes',
      notes: 'Returns a JSON response',
      tags: ['api', 'Processes'],
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
      description: 'Get an Process',
      notes: 'Returns a JSON response',
      tags: ['api', 'Processes'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Process')
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
      description: 'Create a new Process',
      notes: 'Returns a JSON response',
      tags: ['api', 'Processes'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name of the Process')
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
      description: 'Update an Process',
      notes: 'Returns a JSON response',
      tags: ['api', 'Processes'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Process')
        },
        payload: {
          name: Joi.string().optional().description('Name of the Process')
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
      description: 'Delete an Process',
      notes: 'Returns a JSON response',
      tags: ['api', 'Processes'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Process')
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
