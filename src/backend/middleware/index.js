import handler from 'feathers-errors/handler';
import notFound from 'feathers-errors/not-found';

function middleware() {
  return function () {
    const app = this;

    app.use(notFound());
    app.use(handler());
  }
}

export default middleware;