module.exports = function (sequelize, DataTypes) {

  const Processes = sequelize.define('Processes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING(32)
  });
  return Processes;
};
