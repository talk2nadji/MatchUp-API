'use strict'

module.exports = function(options) {
  return function assignMatchGen(hook) {

    const admin = hook.params.user;
    // const firstUser = hook.params.user;
    // const secondUser = hook.params.user;

    hook.data.generatorId = admin._id;
    // hook.data.userOneId = firstUser._id;
    // hook.data.userTwoId = secondUser._id;
  }
}
