const Good = require('good');

const plugin = (fonestorm, options, nextPlugin) => {

  // Set Good options.
  const goodOptions = {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: ['response', 'info', 'errorHandler'],
          response: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };
  fonestorm.register([{ register: Good, options: goodOptions }], (err) => {

    /* $lab:coverage:off$ */
    if (err) {
      throw err;
    }
    // Exclude good-console reporter from test environment.
    // Otherwise it will clutter the output when running lab tests.
    if (process.env.NODE_ENV === 'test') {
      delete goodOptions.reporters.console;
    };
    /* $lab:coverage:on$ */
    fonestorm.dependency(plugin.attributes.dependencies, (server, nextDependency) => {

      // Decorate request with a method for obtaining log data.
      server.decorate('request', 'getLogData', function () {
        // Method for replacing sensitive fields with a placeholder value.
        const scrub = (data) => {
          // Is data an object with keys that can be used to identify sensitive fields?
          if (typeof data === 'object' && data !== null) {
            // Sensitive data fields to be replaced.
            const sensitiveFields = process.env.SENSITIVE_FIELDS.split(',');
            // Create a new object to be returned with scrubbed values.
            return Object.keys(data).reduce((scrubbedData, key) => {
              // Set initial value of scrubbed data to use request data as is.
              scrubbedData[key] = data[key];
              // Replace with placeholder value if payload key is sensitive.
              if (sensitiveFields.includes(key)) {
                scrubbedData[key] = process.env.SENSITIVE_FIELDS_PLACEHOLDER;
              }
              // Return the new object with scrubbed data values.
              return scrubbedData;
            }, {});
          }
          return data;
        };
        // Clone response source object so it's not directly altered.
        const responseSource = Object.assign({}, this.response.source);
        // Remove object properties that contain circular references.
        if (this.response.variety && this.response.variety === 'view') {
          delete responseSource.manager;
          delete responseSource.compiled;
        }
        // We log requests with an object that contains these properties.
        return {
          request: {
            headers: scrub(this.headers),
            // Requests are proxied by HAProxy. Check for a forwarded protocol.
            protocol: this.headers['x-forwarded-proto'] || this.connection.info.protocol,
            // Version BASE URI with full path including query string.
            url: `${process.env.BASE_URI}${this.url.path}`,
            method: this.method,
            body: scrub(this.payload),
            route: {
              path: this.route.path
            }
          },
          response: {
            statusCode: this.response.statusCode,
            headers: this.response.headers,
            payload: scrub(responseSource)
          }
        };
      });
      // Handle response events.
      server.on('response', (request) => {
        // Don't log responses for routes mounted by hapi-swagger.
        if (request.route.realm.plugin === 'hapi-swagger') {
          return;
        }
        // Log response errors.
        if (request.response.statusCode >= 400) {
          return server.log(['response', 'error'], request.getLogData());
        }
        // Log response info.
        server.log(['response', 'info'], request.getLogData());
      });
      nextDependency();
    });
    nextPlugin();
  });
};

plugin.attributes = {
  name: 'logging',
  dependencies: []
};

exports.register = plugin;
