const internals = {
  routes: require('./routes')
};

const plugin = (fonestorm, options, nextPlugin) => {

  fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {

    server.select('api').route(internals.routes);
    nextDependency();
  });
  nextPlugin();
};

plugin.attributes = {
  name: 'models',
  dependencies: ['error-handler']
};

exports.register = plugin;
