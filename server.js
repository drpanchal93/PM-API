require('dotenv').config();
const Hapi = require('hapi');
const server = new Hapi.Server();
server.app.env = process.env;
server.connection({
  port: process.env.SERVER_PORT,
  labels: ['api'],
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['token']
    }
  }
});
server.register([
  { register: require('./plugins/db') },
  { register: require('./plugins/categories'),  routes: { prefix: '/categories' } },
  { register: require('./plugins/docs') },
  { register: require('./plugins/error-handler') },
  { register: require('./plugins/logging') },
  { register: require('./plugins/models'),  routes: { prefix: '/models' } },
  { register: require('./plugins/processes'),  routes: { prefix: '/processes' } },
  { register: require('./plugins/rendering-engine') },
  { register: require('./plugins/swagger') },
  { register: require('./plugins/items'),  routes: { prefix: '/items' } },
  { register: require('./plugins/items-in'),  routes: { prefix: '/itemsIn' } },
  { register: require('./plugins/vendors'), routes: { prefix: '/vendors' } },
  { register: require('./plugins/version-header') }
], (err) => {

  if (err) {
    throw err;
  }
  server.start((err) => {

    if (err) {
      throw err;
    }
    server.log('info', 'Server API running at: ' + server.select('api').info.uri);
  });
});

module.exports = server;
