function appendOwner() {
  return function execute(hook) {
    if (hook.type !== 'before') {
      throw new Error('The append owner hook should be used as a before hook ');
    }

    if (!hook.data.userId) {
      hook.data.userId = hook.params.user._id;
    }
  }
}

export default appendOwner;