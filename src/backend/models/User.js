import Model from './Model';
import Joi from 'Joi';

class User extends Model {
  static get schema() {
    return {
      username: Joi.string().required(),
      password: Joi.string().required(),
    }
  }

  getAverageWpm(args) {
    if (!args || args.length === 0) {
      return 0;
    }
    const len = args.length;
    const wpm = args.reduce((total, value) => { return total + value; });
    return Math.floor(wpm / len);
  }

  getTotalWords(args) {
    if (!args || args.length === 0) {
      return 0;
    }
    const words = args.reduce((total, value) => { return total + value });
    return words;
  }

}

export default User;