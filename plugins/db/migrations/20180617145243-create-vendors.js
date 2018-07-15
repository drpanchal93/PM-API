module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('Vendors', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING(32),
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

    return queryInterface.dropTable('Vendors');
  }
};
