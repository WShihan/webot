import { CMD } from './base.js';
import { writeConfig } from '../config/index.js';

// 对应配置项中文描述
const configMap = {
  接口: 'GPT_URL',
  角色: 'ROLE',
  模型: 'GPT_MODEL',
  密钥: 'GPT_KEY',
  口令: 'FRIENDSHIP_PASS',
};

export class ConfigSetCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
  }
  /**
   *
   * @param {String} msg
   */
  validator(msg) {
    const conigNames = Object.keys(configMap);
    let match = false;
    for (let i = 0; i < conigNames.length; i++) {
      if (msg.startsWith(conigNames[i])) {
        match = true;
        this.keyword = conigNames[i];
        break;
      }
    }
    return match;
  }
  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {String} msg
   * @returns {String}
   */
  async run(contact, msg) {
    const value = msg.replace(this.keyword, '').trim();
    writeConfig({ [configMap[this.keyword]]: value });
    const res = `指令${this.name}：${value}`;
    console.log(res);
    return res;
  }
}
