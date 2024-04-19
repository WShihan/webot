import { WechatyBuilder } from 'wechaty';
import { onScan, onLogin, onLogout, onMessage, onFriendship } from './bot/index.js';

export const bot = WechatyBuilder.build({
    name: 'wechatBot',
    puppetOptions: {
      uos: true, // 开启uos协议
    },
    puppet: 'wechaty-puppet-wechat',
  });

  bot.on('scan', onScan)
  bot.on('login', onLogin)
  bot.on('logout', onLogout)
  bot.on('message', onMessage)
  bot.on('friendship', onFriendship)

  export default bot;
bot
  .start()
  .then(() => console.log('开始登陆微信……'))
  .catch(e => console.error(e));
