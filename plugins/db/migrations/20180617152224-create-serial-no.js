module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('SerialNos', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      items_in_id: Sequelize.UUID,
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

    return queryInterface.dropTable('SerialNos');
  }
};
