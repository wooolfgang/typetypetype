import users from './users';
import authentication from './authentication';
import texts from './texts';

function services(db) {
  return function execute() {
    const app = this;

    // Set up service used for authentication before authentication service
    app.configure(users(db));
    app.configure(authentication());
    app.configure(texts(db));
  }
}

export default services;