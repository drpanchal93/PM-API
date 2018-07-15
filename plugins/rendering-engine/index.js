const Inert = require('inert');
const Vision = require('vision');

const plugin = (fonestorm, options, nextPlugin) => {

  fonestorm.register([Inert, Vision], (err) => {

    /* $lab:coverage:off$ */
    if (err) {
      throw err;
    }
    /* $lab:coverage:on$ */
    fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {

      nextDependency();
    });
  });
  nextPlugin();
};

plugin.attributes = {
  name: 'rendering-engine',
  dependencies: ['inert', 'vision']
};

exports.register = plugin;
