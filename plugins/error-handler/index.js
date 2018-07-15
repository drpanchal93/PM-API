const Boom = require('boom');

const plugin = (fonestorm, options, nextPlugin) => {

  fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {
    // Decorate reply with an error handler.
    server.decorate('reply', 'errorHandler', function (error) {

      try {
        server.log(['errorHandler'], error.message || error);
        const response = (error.isBoom) ? error : Boom.create(error.statusCode || error.status_code, error.message);
        return this.response({
          status_code: response.output.payload.statusCode,
          error: response.output.payload.error,
          message: response.output.payload.message
        }).code(response.output.payload.statusCode);
      }
      catch (exception) {
        const response = Boom.badImplementation(error);
        return this.response({
          status_code: response.output.payload.statusCode,
          error: response.output.payload.error,
          message: response.output.payload.message
        }).code(response.output.payload.statusCode);
      }
    });
    nextDependency();
  });
  nextPlugin();
};

plugin.attributes = {
  name: 'error-handler',
  dependencies: []
};

exports.register = plugin;
