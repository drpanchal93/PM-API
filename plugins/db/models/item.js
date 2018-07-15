module.exports = function (sequelize, DataTypes) {

  const Items = sequelize.define('Items', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING(128),
    code: DataTypes.STRING(32),
    category_id: DataTypes.UUID,
    measurements: DataTypes.STRING(32),
    measurement_unit: DataTypes.STRING(32),
    type: DataTypes.STRING(32),
    make: DataTypes.STRING(32),
    material: DataTypes.STRING(128),
    quality_check: DataTypes.BOOLEAN,
    drawing_no: DataTypes.STRING(32),
    drawing_url: DataTypes.STRING(128),
    image_url: DataTypes.STRING(128),
    notes: DataTypes.STRING(512),
    threshold: DataTypes.INTEGER,
    supplier: DataTypes.STRING(128)
  });
  Items.associate = (models) => {

    Items.belongsTo(models.ItemCategories, {
      as: 'category',
      foreignKey: 'category_id'
    });
    Items.belongsTo(models.Vendors, {
      as: 'vendor',
      foreignKey: 'supplier'
    });
    Items.belongsToMany(models.Models, {
      through: 'ItemModels',
      as: 'models',
      hooks: true,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return Items;
};
