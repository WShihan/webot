export const configData = {
  BOT_KEY: '',
  // chatgpt 接口
  GPT_URL: '',
  // chatgpt 接口密钥
  GPT_KEY: '',
  // chatgpt模型
  GPT_MODEL: 'gpt-3.5-turbo',
  // chatgpt 系统提示（角色）
  ROLE: '一个微信机器人，说话很温柔',
  // 好友申请自动通过口令
  FRIENDSHIP_PASS: '',
  // 敏感词汇
  BLOCK_WORDS: [],
  // 回调事件
  CALLBACKS: [
    {
      keyword: '##',
      url: 'https://www.wsh233.cn/api/bot',
    },
  ],
};
export default configData;
