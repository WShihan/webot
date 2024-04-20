import { CMD } from './base.js';
import { writeConfig } from '../config/index.js';

export class RoleSetCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
  }
  /**
   *
   * @param {String} msg
   * @returns {Boolean}
   */
  validator(msg) {
    return msg.startsWith(this.keyword);
  }
  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {String} msg
   * @returns {String}
   */
  async run(contact, msg) {
    const role = msg.replace('角色', '').trim();
    writeConfig({ ROLE: role });
    const res = `角色设置：${role}`;
    console.log(res);
    return res;
  }
}
