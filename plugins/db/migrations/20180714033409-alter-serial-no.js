module.exports = {
  up: function (queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn('SerialNos', 'barcode', { type: Sequelize.STRING(32) }),
      queryInterface.addColumn('SerialNos', 'serial_no', { type: Sequelize.INTEGER })
    ]);
  },

  down: function (queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.removeColumn('SerialNos', 'barcode'),
      queryInterface.removeColumn('SerialNos', 'serial_no')
    ]);
  }
};
