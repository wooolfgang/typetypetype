import User from '../models/User';

function updateStatsOnTextSubmit() {
  return async function execute(hook) {
    if (hook.type !== 'after') {
      throw new Error('The updateStatsOnTextSubmit should be used as an after hook');
    }

    let { user } = hook.params;

    if (!(user instanceof User)) {
      user = new User(user);
    }

    const userId = user._id;    
    const texts = await hook.app.service('api/texts').find({ query: { 'userId': userId } })
    const wpms = texts.map(text => { return text.wpm });
    const words = texts.map(text => { return text.words });
    const response = await hook.app.service('api/users').patch(userId, { 'wpm': user.getAverageWpm(wpms), 'totalWordsTyped': user.getTotalWords(words) });
  }
}

export default updateStatsOnTextSubmit;