function removeProperty(args) {
  return function execute(hook) {
    if (hook.type !== 'after') {
      throw new Error('The removeProperty hook should be used as an after hook');
    }

    if (!(hook.method === 'get' || hook.method === 'find')) {
      throw new Error('The removeProperty hook should only be used in methods FIND and GET');
    }
    
    if (!(hook.params.provider === 'rest' || hook.params.provider === 'socketio')) {
      return hook;
    }
    // This one could be more efficient, maybe update later my brain is not working...
    if (args instanceof Array) {
      args.forEach(arg => {
        if (hook.result instanceof Array) {
          hook.result.forEach(obj => {
            delete obj[arg];
          });
        }
        else {
          delete hook.result[arg];
        }
      });
    }
    else {
      if (hook.result instanceof Array) {
        hook.result.forEach(obj => {
          delete obj[args];
        });
      }
      else {
        delete hook.result[args];
      }
    }
  }
}

export default removeProperty;