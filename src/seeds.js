const feathers = require('feathers-client');
const authentication = require('feathers-authentication');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const host = 'http://localhost:3030';
const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    type: 'local'
  }))
  .configure(rest(host).superagent(superagent));

const userService = app.service('users');
const matchService = app.service('matches');

//TODO isLoggedIn:
const user = {
    name: 'Richard Nadji',
    email: 'talk2nadji@hotmail.com',
    password: 'qwer1234',
    isAdmin: true,
}

const matches = [
  {
    date: Date.now,
    generatorId: 'abas2345456st1',
    user1: 'Superman',
    user2: 'Wonder Woman'
  },
  {
    date: Date.now,
    generatorId: 'abas2345456st2',
    user1: 'Superman',
    user2: 'Wonder Woman'
  },
  {
    date: Date.now,
    generatorId: 'abas2345456st3',
    user1: 'Superman',
    user2: 'Wonder Woman'
  },
  {
    date: Date.now,
    generatorId: 'abas2345456st4',
    user1: 'Superman',
    user2: 'Wonder Woman'
  },
  {
    date: Date.now,
    generatorId: 'abas2345456st5',
    user1: 'Superman',
    user2: 'Wonder Woman'
  },
]

userService.create(user)
  .then((result) => {
    console.log('User created, authenticating as user...');

    app.authenticate({
      type: 'local',
      email: user.email,
      password: user.password,
    }).then((result) => {
      console.log('Authenticated, seeding matches...');

      matches.map((match) => {
        matchService.create(Object.assign({}, match, { token: result.token }))
          .then((result) => {
            console.log('Match seeded...');
          }).catch((error) => {
            console.error('Error seeding match!', error);
          });
      })
    }).catch((error) => {
      console.error('Error authenticating!', error);
    });
  })
  .catch((error) => {
    console.error('Error creating user!', error);
  });
