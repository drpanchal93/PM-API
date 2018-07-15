const Models = require('./models');

const plugin = (fonestorm, options, nextPlugin) => {

  fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {

    server.expose('models', () => Models);
    nextDependency();
  });
  nextPlugin();
};

plugin.attributes = {
  name: 'db',
  dependencies: []
};

exports.register = plugin;
