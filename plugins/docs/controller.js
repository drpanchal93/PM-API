const Path = require('path');

module.exports = {
  redirect: function (request, reply) {

    const uri = Path.join(request.server.app.env.BASE_URI, 'docs');
    reply.redirect(uri);
  }
};
