const internals = {
  controller: require('./controller')
};

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: internals.controller.redirect
    }
  }
];
