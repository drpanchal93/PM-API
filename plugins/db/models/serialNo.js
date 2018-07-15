module.exports = function (sequelize, DataTypes) {

  const SerialNos = sequelize.define('SerialNos', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    serial_no: DataTypes.INTEGER,
    items_in_id: DataTypes.UUID,
    barcode: DataTypes.STRING(32)
    }
  });
  SerialNos.associate = (models) => {

    SerialNos.belongsTo(models.ItemsIns, {
      as: 'items_in',
      foreignKey: 'items_in_id'
    });
    SerialNos.belongsToMany(models.Processes, {
      through: 'SerialNoProcesses',
      as: 'processes',
      hooks: true,
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  };
  return SerialNos;
};
