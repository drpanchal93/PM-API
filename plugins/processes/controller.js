const Boom = require('boom');

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Processes = await models.Processes.findAll();
      reply({ Processes });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Process = await models.Processes.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Process) {
        throw Boom.notFound('Process not found.');
      }
      reply({ Process });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Process = await models.Processes.create(request.payload);
      reply({ Process });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let Process = await models.Processes.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Process) {
        throw Boom.notFound('Process not found.');
      }
      Process = await Process.update(request.payload);
      reply({ Process });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Process = await models.Processes.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Process) {
        throw Boom.notFound('Process Process not found.');
      }
      await Process.destroy();
      reply({ Process });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
