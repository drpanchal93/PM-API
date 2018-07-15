const Boom = require('boom');
const Joi = require('joi');
const Sequelize = require('sequelize');
const isUUID = (id) => {

  const validation = Joi.validate(id, Joi.string().guid({ version: ['uuidv4'] }));
  return (!validation.error) ? true : false;
};

module.exports = {
  list: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      const items = await models.Items.findAll({
        where: {
          category_id: { [Sequelize.Op.like]: `${ request.query.category_id || '%' }` }
        },
        attributes: { exclude: ['category_id', 'supplier'] },
        include: [
          { model: models.ItemCategories, as: 'category' },
          { model: models.Vendors, as: 'vendor' },
          { model: models.Models, as: 'models', where: { no: { [Sequelize.Op.like]: `${ request.query.model_no || '%' }` } }, through: { attributes: [] } } // through.attributes excludes ItemModels join model.
        ]
      });
      reply({ items });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  get: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let item;

      if (isUUID(request.params.id)) {
        item = await models.Items.findOne(
          { where:
            {
              id: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      else {
        item = await models.Items.findOne(
          { where:
            {
              code: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      if (!item) {
        throw Boom.notFound('Item not found.');
      }
      reply({ item });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  create: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      if (request.payload.category_id) {
        const category = await models.ItemCategories.findOne(
          {
            where:
            {
              id: request.payload.category_id
            }
          }
        );
        if (!category) {
          throw Boom.notFound('Category not found.');
        }
      }
      let item = await models.Items.create(request.payload);
      const model_nos = await Promise.all(request.payload.model_nos.map((model) => models.Models.findById(model)));
      await item.setModels(model_nos);
      item = await models.Items.findOne({
        where: { id: item.id },
        attributes: { exclude: ['category_id', 'supplier'] },
        include: [
          { model: models.ItemCategories, as: 'category' },
          { model: models.Vendors, as: 'vendor' },
          { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
        ]
      });
      reply({ item });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  update: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let item;
      if (isUUID(request.params.id)) {
        item = await models.Items.findOne(
          { where:
            {
              id: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      else {
        item = await models.Items.findOne(
          { where:
            {
              code: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      if (!item) {
        throw Boom.notFound('Item not found.');
      }
      if (request.payload.category_id) {
        const category = await models.ItemCategories.findOne(
          { where:
            {
              id: request.payload.category_id
            }
          }
        );
        if (!category) {
          throw Boom.notFound('Category not found.');
        }
      }
      if (request.payload.model_nos) {
        const model_nos = await Promise.all(request.payload.model_nos.map((model) => models.Models.findById(model)));
        await models.setModels(model_nos);
      }
      item = await item.update(request.payload);
      item = await models.Items.findOne(
        { where:
          {
            id: item.id
          },
          attributes: { exclude: ['category_id', 'supplier'] },
          include: [
            { model: models.ItemCategories, as: 'category' },
            { model: models.Vendors, as: 'vendor' },
            { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
          ]
        }
      );reply({ item });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  },
  delete: async function (request, reply) {

    try {
      const models = request.server.plugins.db.models();
      let item;
      if (isUUID(request.params.id)) {
        item = await models.Items.findOne(
          { where:
            {
              id: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      else {
        item = await models.Items.findOne(
          { where:
            {
              code: request.params.id
            },
            attributes: { exclude: ['category_id', 'supplier'] },
            include: [
              { model: models.ItemCategories, as: 'category' },
              { model: models.Vendors, as: 'vendor' },
              { model: models.Models, as: 'models', through: { attributes: [] } } // through.attributes excludes ItemModels join model.
            ]
          }
        );
      }
      if (!item) {
        throw Boom.notFound('Item not found.');
      }
      await item.destroy();
      reply({ item });
    }
    catch (error) {
      reply.errorHandler(error);
    }
  }
};
