const Boom = require('boom');

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Vendors = await models.Vendors.findAll();
      reply({ Vendors });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Vendor = await models.Vendors.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Vendor) {
        throw Boom.notFound('Vendor not found.');
      }
      reply({ Vendor });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Vendor = await models.Vendors.create(request.payload);
      reply({ Vendor });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let Vendor = await models.Vendors.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Vendor) {
        throw Boom.notFound('Vendor not found.');
      }
      Vendor = await Vendor.update(request.payload);
      reply({ Vendor });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const Vendor = await models.Vendors.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!Vendor) {
        throw Boom.notFound('Vendor Vendor not found.');
      }
      await Vendor.destroy();
      reply({ Vendor });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
