import auth from 'feathers-authentication';
import jwt from 'feathers-authentication-jwt';
import local from 'feathers-authentication-local';
import oauth2 from 'feathers-authentication-oauth2';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';

function authentication() {
  return function execute() {
    const app = this;
    const config = app.get('auth');

    app.configure(auth(config));
    app.configure(local());
    app.configure(jwt());

    app.configure(oauth2(Object.assign({
      name: 'google',
      Strategy: GoogleStrategy
    }, config.google)));

    app.service('api/authentication').hooks({
      before: {
        create: [
          auth.hooks.authenticate(['jwt', 'local'])
        ],  
        remove: [
          auth.hooks.authenticate('jwt')
        ]
      }
    });
  }
}

export default authentication;