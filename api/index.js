import axios from 'axios';
import config from '../config/index.js';
import { makeCrypto } from '../utils/index.js';

const request = axios.create({
  timeout: 120000,
  headers: {
    'content-type': 'application/json',
  },
});

request.interceptors.request.use(cfg => {
  if (cfg.method == 'post') {
    const sign = makeCrypto(cfg.data, config.BOT_KEY);
    console.log(JSON.stringify(cfg.data));
    // console.log(sign);
    //  根据密钥和数据体计算签名
    cfg.headers['X-Signature'] = sign;
  }
  return cfg;
});

/**
 *
 * @param {String} word
 * @returns {Promise}
 */
export async function chatWithGPT(cosplay, word) {
  return new Promise((resolve, reject) => {
    request({
      url: config.GPT_URL,
      method: 'post',
      data: {
        model: config.GPT_MODEL,
        messages: [
          {
            role: 'system',
            content: cosplay,
          },
          {
            role: 'user',
            content: word,
          },
        ],
        safe_mode: false,
      },
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.GPT_KEY}` },
    })
      .then(res => {
        if (res.data.choices) {
          const responseContent = res.data.choices[0].message.content;
          resolve(responseContent);
        } else {
          throw Error('chatgpt请求错误！');
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * 自定义接口地址
 * @param {String} word
 * @param {String} url
 * @returns
 */
export function chatWithCMD(word, url) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'post',
      data: {
        word,
      },
    })
      .then(res => {
        let { status, data, msg } = res.data;
        if (status) {
          resolve(data[0]['content']);
        } else {
          resolve(`状态错误:${msg}`);
        }
      })
      .catch(err => {
        reject(`自定义命令异常：${err}`);
      });
  });
}
