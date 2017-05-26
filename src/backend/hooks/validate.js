function validate() {
  return function execute(hook) {  
    if (hook.type !== 'before') {
      throw new Error('This hook should be used as a before hook');
    }

    if (!(hook.method == 'patch' || hook.method == 'update' || hook.method == 'create')) {
      throw new Error('This hook should be used in methods PATCH UPDATE CREATE'); 
    }
    
    if (!hook.data.isValid()) {
      throw new Error('Data submitted is not valid');
    }

    return hook;
  }
}

export default validate;