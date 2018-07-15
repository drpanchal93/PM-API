module.exports = function (sequelize, DataTypes) {

  const Vendors = sequelize.define('Vendors', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING(32)
  });
  return Vendors;
};
