module.exports = function (sequelize, DataTypes) {

  const ItemsIns = sequelize.define('ItemsIns', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    finished: DataTypes.BOOLEAN,
    vendor_id: DataTypes.UUID,
    invoice_no: DataTypes.STRING(128),
    date: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    rate: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    make_of_item: DataTypes.STRING(32),
    measurements: DataTypes.STRING(32),
    measurement_unit: DataTypes.STRING(32),
    notes: DataTypes.STRING(512),
    barcode: DataTypes.STRING(32)
  });
  ItemsIns.associate = (models) => {

    ItemsIns.belongsTo(models.Items, {
      as: 'item',
      foreignKey: 'item_id'
    });
    ItemsIns.belongsTo(models.Vendors, {
      as: 'vendor',
      foreignKey: 'vendor_id'
    });
    ItemsIns.hasMany(models.SerialNos, {
      as: 'serial_nos'
    });
  };
  return ItemsIns;
};
