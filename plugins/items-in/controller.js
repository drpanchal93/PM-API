const Boom = require('boom');

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const itemsIns = await models.ItemsIns.findAll({
        attributes: { exclude: ['item_id', 'vendor_id'] },
        include: [
          { model: models.Items, as: 'item' },
          { model: models.Vendors, as: 'vendor' },
          { model: models.SerialNos, as: 'serial_nos' }
        ]
      });
      reply({ itemsIns });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const itemIn = await models.Items.findOne(
        { where:
          {
            id: request.params.id
          },
          attributes: { exclude: ['item_id', 'vendor_id'] },
          include: [
            { model: models.Items, as: 'item' },
            { model: models.Vendors, as: 'vendor' },
            { model: models.SerialNos, as: 'serial_nos' }
          ]
        }
      );
      if (!itemIn) {
        throw Boom.notFound('Item not found.');
      }
      reply({ itemIn });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let item;
      if (request.payload.item_id) {
        item = await models.Items.findOne(
          {
            where:
            {
              id: request.payload.item_id
            }
          }
        );
        if (!item) {
          throw Boom.notFound('Item not found.');
        }
      }
      if (request.payload.vendor_id) {
        const vendor = await models.Vendors.findOne(
          {
            where:
            {
              id: request.payload.vendor_id
            }
          }
        );
        if (!vendor) {
          throw Boom.notFound('Vendor not found.');
        }
      }
      const itemIn = await models.ItemsIns.create(request.payload);
      for (let i = 1; i <= item.quality; i++) {
        await models.SerialNos.create({
          serial_no: i,
          items_in_id: item.id
        });
      }
      itemIn = await models.Items.findOne({
        attributes: { exclude: ['item_id', 'vendor_id'] },
        include: [
          { model: models.Items, as: 'item' },
          { model: models.Vendors, as: 'vendor' },
          { model: models.SerialNos, as: 'serial_nos' }
        ]
      });
      reply({ itemIn });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let itemIn = await models.ItemsIns.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!itemIn) {
        throw Boom.notFound('Item not found.');
      }
      if (request.payload.vendor_id) {
        const vendor = await models.Vendors.findOne(
          {
            where:
            {
              id: request.payload.vendor_id
            }
          }
        );
        if (!vendor) {
          throw Boom.notFound('Vendor not found.');
        }
      }
      if (request.payload.item_id) {
        const item = await models.Items.findOne(
          {
            where:
            {
              id: request.payload.item_id
            }
          }
        );
        if (!item) {
          throw Boom.notFound('Item not found.');
        }
      }
      itemIn = await item.update(request.payload);
      itemIn = await models.Items.findOne({
        attributes: { exclude: ['item_id', 'vendor_id'] },
        include: [
          { model: models.Items, as: 'item' },
          { model: models.Vendors, as: 'vendor' },
          { model: models.SerialNos, as: 'serial_nos' }
        ]
      });
      reply({ itemIn });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  assign: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const itemIn = await models.ItemsIns.findOne(
        { where:
          {
            id: request.params.id
          }
        }
      );
      if (!itemIn) {
        throw Boom.notFound('Item not found.');
      }
      let serialNo = await models.SerialNos.findOne(
        { where:
          {
            item_id: request.params.id,
            serial_no: request.params.serial_no
          }
        }
      );
      if (!serialNo) {
        throw Boom.notFound('Serial No not found.');
      }
      if (request.payload.process_id) {
        const process = await models.Processes.findOne(
          {
            where:
            {
              id: request.payload.process_id
            }
          }
        );
        if (!process) {
          throw Boom.notFound('Process not found.');
        }
      }
      await models.SerialNoProcesses.create({
        serial_no: serialNo.id,
        process_id: process.id
      });
      serialNo = await models.SerialNos.findOne({
        attributes: { exclude: ['item_in_id'] },
        include: [
          { model: models.ItemsIns, as: 'items_in' },
          { model: models.Processes, as: 'processes', through: { attributes: [] } } // through.attributes excludes SerialNoProcesses join model.
        ]
      });
      reply({ serialNo });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const itemIn = await models.ItemsIns.findOne(
        { where:
          {
            id: request.params.id
          },
          attributes: { exclude: ['item_id', 'vendor_id'] },
          include: [
            { model: models.Items, as: 'item' },
            { model: models.Vendors, as: 'vendor' },
            { model: models.SerialNos, as: 'serial_nos' }
          ]
        }
      );
      if (!itemIn) {
        throw Boom.notFound('Item not found.');
      }
      await itemIn.destroy();
      reply({ itemIn });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
