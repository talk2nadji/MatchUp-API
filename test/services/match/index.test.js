'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('match service', function() {
  it('registered the matches service', () => {
    assert.ok(app.service('matches'));
  });
});
