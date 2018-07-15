const plugin = (fonestorm, options, nextPlugin) => {

  fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {
    // Tap into pre-response extension point.
    server.ext('onPreResponse', (request, reply) => {
      // Add API verison to headers.
      if (request.response.isBoom) {
        // Error responses can't use header method and must set boom output headers.
        request.response.output.headers['x-api-version'] = process.env.API_VERSION;
        // Change `statusCode` to `status_code` on boom output.
        delete request.response.output.payload.statusCode;
        request.response.output.payload.status_code = request.response.output.statusCode;
        return reply.continue();
      }
      request.response.header('x-api-version', process.env.API_VERSION);
      reply.continue();
    });
    nextDependency();
  });
  nextPlugin();
};

plugin.attributes = {
  name: 'version-header',
  dependencies: []
};

exports.register = plugin;
