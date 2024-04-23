// import writeConfig from './write.js';
// import readConfig from './read.js';
import fs from 'fs';
import path from 'path';
import config from './data.js';
import { tip } from '../utils/index.js';

const configFilePath = path.join('config', 'config-memory.json');

/**
 * @description 从文件中读取配置对象信息
 * @returns {Object}
 */
export function readConfig() {
  if (fs.existsSync(configFilePath)) {
    const data = fs.readFileSync(configFilePath);
    const localCfg = JSON.parse(data);
    tip('读取本地配置成功');
    return localCfg;
  } else {
    tip('本地配置文件不存在');
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
    tip('持久化保存配置成功');
    return true;
  } catch (err) {
    console.log(err);
    tip('持久化保存配置失败');
    return false;
  }
}

const localConfig = await readConfig();
Object.assign(config, localConfig);
console.log('当前配置：', config);

export default config;
