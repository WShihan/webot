import { CMD } from './base.js';
import { writeConfig } from '../config/index.js';
import { tip } from '../utils/index.js';

// 对应项中文描述
const configMap = {
  接口: 'GPT_URL',
  角色: 'ROLE',
  模型: 'GPT_MODEL',
  密钥: 'GPT_KEY',
  口令: 'FRIENDSHIP_PASS',
};

// 配置修改指令，该命令会重写默认匹配规则，将匹配 接口，角色，模型，密钥，口令五个替换类型配置
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
    contact.say(res);
    tip(res);
  }
}
