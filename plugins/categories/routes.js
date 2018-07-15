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
      description: 'Get Categories',
      notes: 'Returns a JSON response',
      tags: ['api', 'Categories'],
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
      description: 'Get an Category',
      notes: 'Returns a JSON response',
      tags: ['api', 'Categories'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Category')
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
      description: 'Create a new Category',
      notes: 'Returns a JSON response',
      tags: ['api', 'Categories'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name of the Category')
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
      description: 'Update an Category',
      notes: 'Returns a JSON response',
      tags: ['api', 'Categories'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Category')
        },
        payload: {
          name: Joi.string().optional().description('Name of the Category')
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
      description: 'Delete an Category',
      notes: 'Returns a JSON response',
      tags: ['api', 'Categories'],
      validate: {
        params: {
          id: Joi.string().guid({ version: ['uuidv4'] }).required().description('ID of Category')
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
