module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('Models', {

      no: {
        type: Sequelize.STRING(64),
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

    return queryInterface.dropTable('Models');
  }
};
