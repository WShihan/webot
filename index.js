const { WechatyBuilder } = require('wechaty');
const schedule = require('./schedule/index');
const config = require('./config/index');
const untils = require('./utils/index');
const fs = require('fs');
const api = require('./api/index');

// 延时函数，防止检测出类似机器人行为操作
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 二维码生成
function onScan(qrcode, status) {
  console.log('qrcode', qrcode);
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);

  // 将图片链接写入本地文件
  fs.writeFile('login.txt', qrcodeImageUrl, err => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Image link saved to login.txt');
  });
}

// 登录
async function onLogin(user) {
  console.log(`小助理${user}登录了`);
  const date = new Date();

  // 登陆后创建定时任务
  await english_word(config.ENGLISH_TIME);
}

// 登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`);
}

// 监听对话
async function onMessage(msg) {
  const contact = msg.talker(); // 发消息人
  const content = msg.text().trim(); // 消息内容
  const room = msg.room(); // 是否是群消息
  const alias = await contact.alias(); // 备注
  const name = await contact.name(); // 昵称
  const isText = msg.type() === bot.Message.Type.Text;
  if (msg.self()) {
    return;
  }

  if (content.includes('##背单词')) {
    const resp = await addOrRemoveUser(name, alias);
    contact.say(resp);
    return;
  }

  if (content.includes('##')) {
    const resp = await api.chatWithCMD(content);
    contact.say(resp);
    return;
  }

  if (room && isText) {
    // 如果是群消息 只处理文字消息
    const topic = await room.topic();
    console.log(`群名: ${topic} 发消息人: ${await contact.name()} 内容: ${content}`);
  } else if (isText) {
    // 如果非群消息 只处理文字消息
    console.log(`发消息人是: ${alias} 消息内容: ${content}`);
    const response = await api.chatWithGPT(config.COSPLAY, content);
    contact.say(response);
    console.log(`回复: ${contact} 内容: ${response}`);
  }
}

async function addOrRemoveUser(name, alias) {
  let res;
  let subIndex = word_list.findIndex(item => item.name == name || item.alias == alias);
  if (subIndex >= 0) {
    console.log(`背单词移除用户${name}`);
    word_list.splice(subIndex, 1);
    res = '背单词移除';
  } else {
    console.log(`背单词添加用户${name}`);
    word_list.push({ name, alias });
    res = '背单词添加';
  }
  return res;
}

// 创建微信定时任务
async function english_word(timer) {
  console.log(`设定单词定时任务`, timer);
  schedule.setSchedule(timer, async () => {
    console.log('背单词任务启动！');
    let logMsg;
    const str = '单词任务';
    word_list.forEach(async subscriber => {
      console.log(`查找联系人：${subscriber.name}, 昵称: ${subscriber.alias}`);
      let contact =
        (await bot.Contact.find({ name: subscriber.name })) ||
        (await bot.Contact.find({ alias: subscriber.alias })); // 获取你要发送的联系人
      if (typeof contact != 'undefined') {
        try {
          logMsg = str;
          console.log(`开始发送${subscriber.name}`);
          await delay(2000);
          await contact.say(str); // 发送消息
        } catch (e) {
          logMsg = e.message;
        }
        console.log(logMsg);
      } else {
        console.log(`未查询到${subscriber.name}`);
      }
    });
  });
}

const bot = WechatyBuilder.build({
  name: 'wechatBot',
  puppetOptions: {
    uos: true  // 开启uos协议
},
  puppet: 'wechaty-puppet-wechat',
});

let word_list = [];

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);

bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch(e => console.error(e));
