module.exports = function (sequelize, DataTypes) {

  const SerialNoProcesses = sequelize.define('SerialNoProcesses', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    serial_no_id: DataTypes.UUID,
    process_id: DataTypes.UUID,
    status: DataTypes.STRING(32)
  });
  SerialNoProcesses.associate = (models) => {

    SerialNoProcesses.belongsTo(models.Processes, {
      as: 'process',
      foreignKey: 'process_id'
    });
    SerialNoProcesses.belongsTo(models.SerialNos, {
      as: 'serial_no',
      foreignKey: 'serial_no_id'
    });
  };
  return SerialNoProcesses;
};
