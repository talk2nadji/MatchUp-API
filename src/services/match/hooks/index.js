'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const assignMatchGen = require('./assign-match');

const populateGenerator = common.populate('generator', { service: 'users', field: 'generatorId' });
//TODO const populateUser1 = common.populate('user1', { service: 'users', field: 'userOneId' })
//TODO const populateUser2 = common.populate('user2', { service: 'users', field: 'userTwoId' })

exports.before = {
  all: [],
  find: [
    //TODO filter matches by date & currentUser
    //TODO filter matches by date & admin
  ],
  get: [],
  create: [
    // auth.verifyToken(),
    // auth.populateUser(),
    // auth.restrictToAuthenticated(),
    // assignMatchGen()
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
    populateGenerator,
    //TODO populateUser1,
    //TODO populateUser2
    //TODO cleanup sanitize
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
