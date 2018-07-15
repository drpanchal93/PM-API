const Boom = require('boom');

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Models = await models.Models.findAll();
      reply({ Models });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Model = await models.Models.findOne(
        { where:
          {
            no: request.params.no
          }
        }
      );
      if (!Model) {
        throw Boom.notFound('Model not found.');
      }
      reply({ Model });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let Model = await models.Models.findOne(
        { where:
          {
            no: request.params.no
          }
        }
      );
      if (Model) {
        throw Boom.conflict('Model no is already present.');
      }
      Model = await models.Models.create(request.payload);
      reply({ Model });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let Model = await models.Models.findOne(
        { where:
          {
            no: request.params.no
          }
        }
      );
      if (!Model) {
        throw Boom.notFound('Model not found.');
      }
      Model = await Model.update(request.payload);
      reply({ Model });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Model = await models.Models.findOne(
        { where:
          {
            no: request.params.no
          }
        }
      );
      if (!Model) {
        throw Boom.notFound('Model Model not found.');
      }
      await Model.destroy();
      reply({ Model });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
