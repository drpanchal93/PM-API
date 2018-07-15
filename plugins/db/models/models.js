module.exports = function (sequelize, DataTypes) {

  const Models = sequelize.define('Models', {
    no: {
      type: DataTypes.STRING(64),
      primaryKey: true
    },
    name: DataTypes.STRING(32)
  });
  Models.associate = (models) => {

    Models.belongsToMany(models.Items, {
      through: 'ItemModels',
      as: 'items',
      hooks: true,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return Models;
};
