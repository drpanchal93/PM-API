const Boom = require('boom');

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const ItemCategories = await models.ItemCategories.findAll();
      reply({ ItemCategories });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const ItemCategories = await models.ItemCategories.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!ItemCategories) {
        throw Boom.notFound('Item Category not found.');
      }
      reply({ ItemCategories });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const ItemCategories = await models.ItemCategories.create(request.payload);
      reply({ ItemCategories });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let ItemCategories = await models.ItemCategories.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!ItemCategories) {
        throw Boom.notFound('Item Category not found.');
      }
      ItemCategories = await item.update(request.payload);
      reply({ ItemCategories });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const ItemCategories = await models.ItemCategories.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!ItemCategories) {
        throw Boom.notFound('Item Category not found.');
      }
      await ItemCategories.destroy();
      reply({ ItemCategories });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
