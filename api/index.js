const axios = require('axios');
const config = require('../config/index');

/**
 *
 * @param {String} word
 * @returns {Promise}
 */
async function chatWithGPT(cosplay, word) {
  return new Promise((resolve, reject) => {
    axios
      .request({
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
          console.log(responseContent);
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
 *
 * @param {String} cmd
 * @returns {Promise}
 */
async function chatWithCMD(cmd) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: config.CMD_URL,
        method: 'post',
        data: {
          word: cmd,
        },
      })
      .then(res => {
        resolve(res.data.data[0]['content']);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  chatWithGPT,
  chatWithCMD,
};
