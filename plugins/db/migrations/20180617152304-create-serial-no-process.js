module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('SerialNoProcesses', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      serial_no_id: Sequelize.UUID,
      process_id: Sequelize.UUID,
      status: Sequelize.STRING(32),
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

    return queryInterface.dropTable('SerialNoProcesses');
  }
};
