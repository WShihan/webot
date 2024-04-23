import { CMD } from './base.js';
import config from '../config/index.js';
import { chatWithCMD } from '../api/index.js';
import { tip } from '../utils/index.js';

export class CallbackCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
    this.url = null;
  }

  /**
   *
   * @param {String} msg
   * @returns
   */
  validator(msg) {
    const callback = config.CALLBACKS.find(item => msg.startsWith(item.keyword));
    if (typeof callback != 'undefined') {
      this.keyword = callback.keyword;
      this.url = callback.url;
      return true;
    } else return false;
  }

  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {String} msg
   */
  async run(contact, msg) {
    tip(`执行${(this.keyword, this, this.url)}`);
    chatWithCMD(msg, this.url)
      .then(res => {
        contact.say(res);
      })
      .catch(err => {
        contact.say(err);
      });
  }
}

export default CallbackCMD;
