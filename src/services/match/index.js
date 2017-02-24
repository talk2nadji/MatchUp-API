'use strict';

const service = require('feathers-mongoose');
const match = require('./match-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: match,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/matches', service(options));

  // Get our initialize service to that we can bind hooks
  const matchService = app.service('/matches');

  // Set up our before hooks
  matchService.before(hooks.before);

  // Set up our after hooks
  matchService.after(hooks.after);
};
