module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('ItemModels', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      item_id: Sequelize.UUID,
      model_no: Sequelize.STRING(64),
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

    return queryInterface.dropTable('ItemModels');
  }
};
