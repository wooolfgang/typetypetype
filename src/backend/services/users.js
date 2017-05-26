import feathersMongo from 'feathers-mongodb';
import { hooks } from 'feathers-authentication-local';
import User from '../models/User';
import transform from '../hooks/transform';
import validate from '../hooks/validate';
import removeProperty from '../hooks/removeProperty';

function users(db) {
  return function execute() {
    const app = this;

    app.use('api/users', feathersMongo({ Model: db.collection('users') }));

    app.service('api/users').hooks({
      before: {
        find: [transform(User)],
        get: [transform(User)],
        create: [hooks.hashPassword({ passwordField: 'password' }), transform(User), validate()],
        update: [transform(User)],
        patch: [transform(User)],
        remove: [transform(User)]
      },
      after: {
        find: [transform(User), removeProperty(['password']),],
        get: [transform(User), removeProperty(['password']),],
        create: [transform(User)],
        update: [transform(User)],
        patch: [transform(User)],
        remove: [transform(User)]
      },
    });
  }
}

export default users;