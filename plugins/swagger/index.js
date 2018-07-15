const HapiSwagger = require('hapi-swagger');
const Pack = require('../../package.json');

const plugin = (fonestorm, options, nextPlugin) => {

  // Set Swagger options
  const swaggerOptions = {
    basePath: (process.env.BASE_URI === '/') ? null : process.env.BASE_URI,
    documentationPath: '/docs',
    info: {
      title: `API ${Pack.version}`,
      version: Pack.version
    },
    tags: [
      {
        name: 'api',
        description: 'API Functions'
      },
      {
        name: 'items',
        description: 'Items Object Functions'
      }
    ]
  };
  fonestorm.select('api').register({ register: HapiSwagger, options: swaggerOptions }, (err) => {

    /* $lab:coverage:off$ */
    if (err) {
      throw err;
    }
    /* $lab:coverage:on$ */
    fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {

      nextDependency();
    });
    nextPlugin();
  });
};

plugin.attributes = {
  name: 'swagger',
  dependencies: ['rendering-engine']
};

exports.register = plugin;
