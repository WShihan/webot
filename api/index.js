import axios from 'axios';
import config from '../config/index.js';


const request = axios.create({
    timeout: 120000,
    headers: {
      'content-type': 'application/json',
    },
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