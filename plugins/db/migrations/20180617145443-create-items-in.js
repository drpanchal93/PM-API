module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('ItemsIns', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      item_id: Sequelize.UUID,
      finished: Sequelize.BOOLEAN,
      vendor_id: Sequelize.UUID,
      invoice_no: Sequelize.STRING(128),
      date: Sequelize.DATE,
      quantity: Sequelize.INTEGER,
      rate: Sequelize.DOUBLE,
      discount: Sequelize.DOUBLE,
      make_of_item: Sequelize.STRING(32),
      measurements: Sequelize.STRING(32),
      measurement_unit: Sequelize.STRING(32),
      notes: Sequelize.STRING(512),
      barcode: Sequelize.STRING(32),
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      charset: 'utf8'
    });
  },
  down: function (queryInterface, Sequelize) {

    return queryInterface.dropTable('ItemsIns');
  }
};
