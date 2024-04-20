import config from '../config/index.js';

/**
 *
 * @param {import('wechaty').Friendship} friendship
 */
// 监听好友申请事件
export async function onFriendship(friendship) {
  try {
    /**
     * @type {import('wechaty').Wechaty}
     */
    let bot = this;
    console.log(`收到好友添加申请，来自 ${friendship.contact().name()}`);
    // 判断暗号是否自动添加
    if (friendship.type() === bot.Friendship.Type.Receive) {
      if (friendship.hello() === config.FRIENDSHIP_PASS) {
        console.log('暗号正确，将自动添加通过好友申请！');
        await friendship.accept();
      } else {
        console.log('暗号不正确');
      }
    } else if (friendship.type() == bot.Friendship.Type.Confirm) {
      console.log('通过好友申请');
    } else {
      console.log('未知好友状态');
    }
  } catch (err) {
    console.error(`处理好友关系异常：${err}`);
  }
}

export default onFriendship;
