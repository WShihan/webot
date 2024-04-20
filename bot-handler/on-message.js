// 监听对话
import { delay } from '../utils/index.js';
import { chatWithGPT } from '../api/index.js';
import config from '../config/index.js';
import { RoleSetCMD, CMD } from '../command/index.js';

const commands = [new RoleSetCMD('角色', '角色修改')];

/**
 *
 * @param {import('wechaty').Message} msg
 * @returns
 */
export async function onMessage(msg) {
  try {
    /**
     * @type {import('wechaty').Wechaty}
     */
    const bot = this;
    const contact = msg.talker(); // 发消息人
    const content = msg.text().trim(); // 消息内容
    const room = msg.room(); // 是否是群消息
    const alias = await contact.alias(); // 备注
    const name = contact.name(); // 昵称
    const time = msg.date(); // 发送时间
    const isText = msg.type() === bot.Message.Type.Text;

    // 统一等待2s防止检测出非人工
    await delay(2000);

    if (msg.self() || content == config.FRIENDSHIP_PASS) {
      return;
    }
    
    // 检验是否为命令
    const cmd = commands.find(item => item.validator(content));
    if (typeof cmd != 'undefined') {
      const res = await cmd.run(contact, content);
      contact.say(res);
      return;
    }

    // 普通信息
    // 群消息
    if (room && isText) {
      // 群消息 只处理文字消息
      const topic = await room.topic();
      console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
      // room.say(`@${name},小助手不支持在群里对话，需要添加好友到通讯录里！`);
    } else if (isText) {
      // 非群消息 只处理文字消息
      console.log(`发消息人是: ${name} 备注：${alias},消息内容: ${content}`);
      const response = await chatWithGPT(config.ROLE, content);
      contact.say(response);
      console.log(`回复: ${contact} 内容: ${response}`);
    } else {
      const response = '小助手无法处理非文字信息哦';
      contact.say(response);
      console.log(`回复: ${contact} 内容: ${response}`);
    }
  } catch (err) {
    console.log('对话错误: ' + err);
  }
}
