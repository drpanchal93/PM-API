module.exports = function (sequelize, DataTypes) {

  const ItemModels = sequelize.define('ItemModels', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    item_id: DataTypes.UUID,
    model_no: DataTypes.STRING(64)
  });
  ItemModels.associate = (models) => {

    ItemModels.belongsTo(models.Items, {
      as: 'item'
    });
    ItemModels.belongsTo(models.Models, {
      as: 'model'
    });
  };
  return ItemModels;
};
