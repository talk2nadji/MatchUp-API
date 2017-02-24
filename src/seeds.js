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
const matchService = app.service('match');


const user = {
    name: 'Richard Nadji',
    email: 'talk2nadji@hotmail.com',
    password: 'qwer1234',
    isAdmin: true
}

const matches = [

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
