// import writeConfig from './write.js';
// import readConfig from './read.js';
import fs from 'fs';
import path from 'path';

let config = {
  GPT_URL: '',
  GPT_KEY: '',
  GPT_MODEL: 'gpt-3.5-turbo',
  ROLE: '你是一个聪明的微信机器人，需要在不违反微信协议的情况下回答我的问题，答案尽量简洁明了，语气可以俏皮可爱一点。',
  FRIENDSHIP_PASS: '哈哈哈',
};



const configFilePath = path.join('config', 'data.json');

/**
 * @description 从文件中读取配置对象信息
 * @returns {Object}
 */
export function readConfig() {
  if (fs.statSync(configFilePath)) {
    const data = fs.readFileSync(configFilePath);
    return JSON.parse(data);
  } else {
    return {};
  }
}

/**
 * @description 写入配置信息
 * @param {Object} data
 * @returns {Boolean}
 */
export async function writeConfig(data) {
  try {
    Object.assign(config, data);
    const jsonData = JSON.stringify(config);
    fs.writeFileSync(configFilePath, jsonData);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const localConfig = await readConfig();
Object.assign(config, localConfig);
console.log('读取保存的本地配置', config);

export default config;
