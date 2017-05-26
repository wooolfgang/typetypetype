import feathersMongo from 'feathers-mongodb';
import hooks from 'feathers-authentication-hooks';
import appendOwner from '../hooks/appendOwner';
import updateStatsOnTextSubmit from '../hooks/updateStatsOnTextSubmit';

function texts(db) {
  return function execute() {
    const app = this;

    app.use('api/texts', feathersMongo({ Model: db.collection('text') }));

    app.service('api/texts').hooks({
      before: {
        find: [],
        get: [],
        create: [appendOwner()],
        update: [],
        patch: [],
        remove: []
      },
      after: {
        find: [],
        get: [],
        create: [updateStatsOnTextSubmit()],
        update: [],
        patch: [],
        remove: []
      },
    });
  }
}

export default texts;