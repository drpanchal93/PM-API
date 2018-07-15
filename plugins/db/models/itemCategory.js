module.exports = function (sequelize, DataTypes) {

  const ItemCategories = sequelize.define('ItemCategories', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING(32)
  });
  return ItemCategories;
};
