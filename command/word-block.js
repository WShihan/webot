import { CMD } from './base.js';
import { writeConfig } from '../config/index.js';
import config from '../config/index.js';
import { tip } from '../utils/index.js';

// 添加敏感词词汇
export class WordBlockAddCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
  }

  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {string} msg
   */
  async run(contact, msg) {
    const words = msg.replace(this.keyword, '').trim().split('，');
    words.push(...config.BLOCK_WORDS);
    writeConfig({ BLOCK_WORDS: words });
    const res = `${this.name}成功`;
    contact.say(res);
    tip(res);
  }
}

// 移除敏感词汇
export class WordBlockRemoveCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
  }

  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {string} msg
   */
  async run(contact, msg) {
    const words = msg.replace(this.keyword, '').trim().split('，');
    const updatedWords = config.BLOCK_WORDS.filter(item => !words.includes(item));
    writeConfig({ BLOCK_WORDS: updatedWords });
    const res = `${this.name}成功`;
    contact.say(res);
    tip(res);
  }
}

// 查看当前敏感词汇
export class WordBlockCheckCMD extends CMD {
  constructor(keyword, name) {
    super(keyword, name);
  }

  /**
   *
   * @param {import('wechaty').Contact} contact
   * @param {string} msg
   */
  async run(contact, msg) {
    const words = config.BLOCK_WORDS;
    const res = words.length > 0 ? words.join('，') : '无';
    contact.say(res);
    tip(res);
  }
}
