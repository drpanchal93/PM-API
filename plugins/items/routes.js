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
      description: 'Get items',
      notes: 'Returns a JSON response',
      tags: ['api', 'items'],
      validate: {
        query: {
          category_id: Joi.string().optional().description('ID of Category'),
          model_no: Joi.string().optional().description('Model no')
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
    method: 'get',
    path: '/{id}',
    handler: internals.controller.get,
    config: {
      description: 'Get an item',
      notes: 'Returns a JSON response',
      tags: ['api', 'items'],
      validate: {
        params: {
          id: Joi.alternatives().try([
            Joi.string().guid({ version: ['uuidv4'] }),
            Joi.string()
          ]).required().description('ID of item.')
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
      description: 'Create a new item',
      notes: 'Returns a JSON response',
      tags: ['api', 'items'],
      validate: {
        payload: {
          name: Joi.string().required().description('Name of the Item'),
          code: Joi.string().optional().description('Item code'),
          category_id: Joi.string().optional().description('Item category id'),
          measurements: Joi.string().optional().description('Item measurements'),
          measurement_unit: Joi.string().optional().description('Item measurement unit'),
          type:Joi.any().valid(['BoughtOut']).optional().description('Item type'),
          make: Joi.string().optional().description('Item make'),
          material: Joi.string().optional().description('Item material'),
          quality_check: Joi.boolean().optional().description('Item quality check true or false'),
          drawing_no: Joi.string().optional().description('Item drawing no'),
          drawing_url:Joi.string().uri({ scheme: ['http', 'https'] }).optional().description('Drawing URL for item'),
          image_url: Joi.string().uri({ scheme: ['http', 'https'] }).optional().description('Drawing URL for image'),
          notes: Joi.string().optional().description('Item notes'),
          threshold: Joi.number().optional().description('Item threshold'),
          supplier: Joi.string().optional().description('Item supplier'),
          model_nos: Joi.array().items(Joi.string()).optional().description('Model nos')
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
      description: 'Update an item',
      notes: 'Returns a JSON response',
      tags: ['api', 'items'],
      validate: {
        params: {
          id: Joi.alternatives().try([
            Joi.string().guid({ version: ['uuidv4'] }),
            Joi.string()
          ]).required().description('ID of item.')
        },
        payload: {
          name: Joi.string().optional().description('Name of the Item'),
          code: Joi.string().optional().description('Item code'),
          category_id: Joi.string().optional().description('Item category id'),
          measurements: Joi.string().optional().description('Item measurements'),
          measurement_unit: Joi.string().optional().description('Item measurement unit'),
          type:Joi.string().optional().description('Item type'),
          make: Joi.string().optional().description('Item make'),
          material: Joi.string().optional().description('Item material'),
          quality_check: Joi.boolean().optional().description('Item quality check true or false'),
          drawing_no: Joi.string().optional().description('Item drawing no'),
          drawing_url:Joi.string().uri({ scheme: ['http', 'https'] }).optional().description('Drawing URL for item'),
          image_url: Joi.string().uri({ scheme: ['http', 'https'] }).optional().description('Drawing URL for image'),
          notes: Joi.string().optional().description('Item notes'),
          threshold: Joi.number().optional().description('Item threshold'),
          supplier: Joi.string().optional().description('Item supplier'),
          model_nos: Joi.array().items(Joi.string()).optional().description('Model nos')
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
      description: 'Delete an item',
      notes: 'Returns a JSON response',
      tags: ['api', 'items'],
      validate: {
        params: {
          id: Joi.alternatives().try([
            Joi.string().guid({ version: ['uuidv4'] }),
            Joi.string()
          ]).required().description('ID of item.')
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
