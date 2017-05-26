function transform(Model) {
  return function execute(hook) {
    const key = hook.type === 'before' ? 'data' : 'result';

    if (hook[key] instanceof Array) {
      hook[key].map(hook => {
        return hook = new Model(hook[key]);
      });
    }
    else {
      hook[key] = new Model(hook[key]);
    }
  }
}

export default transform;