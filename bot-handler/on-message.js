// 监听对话
import { delay } from '../utils/index.js';
import { chatWithGPT } from '../api/index.js';
import config from '../config/index.js';
import {
  ConfigSetCMD,
  WordBlockAddCMD,
  WordBlockRemoveCMD,
  WordBlockCheckCMD,
  CallbackCMD,
} from '../command/index.js';
import { tip } from '../utils/index.js';
import { ConversaionManager, Conversation } from './conversation.js';

// 所有自定义指令
const commands = [
  new ConfigSetCMD(null, '配置修改'),
  new WordBlockCheckCMD('敏感词', '查看敏感词'),
  new WordBlockAddCMD('添加敏感词', '添加敏感词汇'),
  new WordBlockRemoveCMD('移除敏感词', '移除敏感词汇'),
  new CallbackCMD(null, '回调命令'),
];

const conversationMng = new ConversaionManager();

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

    if (room) console.log(`群名: ${room.topic()} 发消息人: ${contact.name()} 内容: ${content}`);
    else console.log(`发消息人是: ${name} 备注：${alias},消息内容: ${content}`);

    // 检验是否为命令
    const cmd = commands.find(item => item.validator(content));
    if (typeof cmd != 'undefined') {
      cmd.run(contact, content);
      return;
    }

    // 检测是否包含禁止词汇
    const blockWord = config.BLOCK_WORDS.find(item => content.includes(item));
    if (typeof blockWord != 'undefined') {
      const res = `无法回答，包含敏感词：${blockWord}`;
      tip(res);
      contact.say(res);
      return;
    }

    // 普通信息
    // 群消息
    if (room && isText) {
      // room.say(`@${name},小助手不支持在群里对话，需要添加好友到通讯录里！`);
    } else if (isText) {
      // 非群消息 只处理文字消息
      let chat = conversationMng.getChat(name);
      chat.push({ role: 'user', content });
      const response = await chatWithGPT(config.ROLE, chat);
      chat.push({ role: 'assistant', content: response });
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
