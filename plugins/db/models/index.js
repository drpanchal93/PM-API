require('dotenv').config({ path:'.env' });
const Fs        = require('fs');
const Path      = require('path');
const Sequelize = require('sequelize');
const basename  = Path.basename(module.filename);
const db        = {};

let connection = {};

connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING
};

const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
  host: connection.host,
  port: connection.port,
  dialect: connection.dialect,
  logging: (connection.logging === 'true'),
  define: {
    underscored: true
  }
});

Fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0))
  .filter((file) => (file !== basename))
  .filter((file) => (file.slice(-3) === '.js'))
  .forEach((file) => {

    const model = sequelize.import(Path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
