'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const assignGeneratorAdmin = function(options) {
  return function(hook) {

    const user = hook.params.user;
    hook.data.generatorAdminId = user._id;
    hook.data.userOneId = user._id;
    hook.date.userTwoId = user._id;
  }
}

const populateGeneratorAdmin = common.populate('generatorAdmin', { service: 'users', field: 'generatorAdminId' })

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    assignGeneratorAdmin()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ]
};

exports.after = {
  all: [
    populateGeneratorAdmin
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
