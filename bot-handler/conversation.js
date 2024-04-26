// 简单对话类
export class Conversation extends Array {
  constructor(id) {
    super();
    this.id = id;
    this.maxRound = 3;
  }

  toString() {
    return JSON.stringify(this);
  }

  push(item) {
    if (this.length / 2 >= this.maxRound) this.shift();
    super.push(item);
  }
}

// 简单实现一个对话管理器
export class ConversaionManager {
  constructor() {
    this.chats = [];
    this.maxRound = 3;
  }

  /**
   * @param {String} id
   * @param {Conversation} chat
   */
  addChat(chat) {
    this.chats.push(chat);
  }

  /**
   * @returns {Array<Conversation>}
   */
  getAllChat() {
    return this.chats;
  }

  /**
   * @param {String} id
   * @returns {Conversation}
   */
  getChat(id) {
    let chat = this.chats.find(item => item.id === id);
    if (typeof chat == 'undefined') {
      chat = new Conversation(id);
      this.addChat(chat);
    }
    return chat;
  }
}
