/**
 * 命令基类
 */
export class CMD {
  /**
   *
   * @param {String} keyword 关键字
   * @param {String} name 命令名称
   */
  constructor(keyword, name) {
    this.keyword = keyword;
    this.name = name;
  }

  /**
   * @description 命令逻辑
   * @param {import('wechaty').Contact} contact
   * @param {String} msg
   * @returns {Boolean}
   */
  async run(contact, msg) {}

  /**
   * @description 校验关键字(触发条件)
   * @param {String} msg
   * @returns {Boolean}
   */
  validator(msg) {
    return msg.startsWith(this.keyword);
  }
}
