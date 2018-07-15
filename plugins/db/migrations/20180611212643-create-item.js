module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('Items', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING(128),
      code: Sequelize.STRING(32),
      category_id: Sequelize.UUID,
      measurements: Sequelize.STRING(32),
      measurement_unit: Sequelize.STRING(32),
      type: Sequelize.STRING(32),
      make: Sequelize.STRING(32),
      material: Sequelize.STRING(128),
      quality_check: Sequelize.BOOLEAN,
      drawing_no: Sequelize.STRING(32),
      drawing_url: Sequelize.STRING(128),
      image_url: Sequelize.STRING(128),
      notes: Sequelize.STRING(512),
      threshold: Sequelize.INTEGER,
      supplier: Sequelize.STRING(128),
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

    return queryInterface.dropTable('Items');
  }
};
