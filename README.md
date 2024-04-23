![GitHub Repo stars](https://img.shields.io/github/stars/WShihan/webot?style=plastic)  ![GitHub forks](https://img.shields.io/github/forks/WShihan/webot?style=plastic)   ![GitHub repo size](https://img.shields.io/github/repo-size/WShihan/webot?style=plastic)   ![GitHub](https://img.shields.io/github/license/WShihan/webot) ![GitHub last commit](https://img.shields.io/github/last-commit/WShihan/webot?style=plastic) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/WShihan/webot)

## 介绍

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/tiger.png" width="30px" alt="小助手"  /></p>



<p>一个基于<a href="https://github.com/wechaty/wechaty">wechaty</a>的迷你<img width="15px" src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/icon/wechat.svg" style="display: inline-block;">机器人。</p>

   

功能：

* AI对话，可接入ChatGPT。
* 可通过微信设置角色



## 安装

### 准备

* Node > 14
* 一个微信账号



### 1.克隆仓库

```shell
git clone https://github.com/WShihan/webot.git
```

  

### 2.修改配置

在config目录下新建立一个data.json文件，填入如下配置项

```json
{
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
  // 自定义指令回调地址
  CMD_URL: '',
  // 敏感词汇
  BLOCK_WORDS: [],
}

```



### 3.安装依赖

在终端进入项目目录，执行如下命令安装依赖

```shell
npm install
```

   

### 4.启动机器人

执行如下命令启动机器人后，终端会显示二维码，需要打开手机客户端扫码登入。      
⚠️ 注意：一定记得要使用小号，因为存在封号风险。

```shell
npm start
```

![image-20240416134131663](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416134131663.png)  

   

如果你没有机器可供部署，可以添加我已经部署好的助手体验（备注：github）。

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416140029042.png" alt="image-20240416140029042" width="40%"  style="border-radius: 5px;" /></p>



## 使用

### 1.对话

直接发送消息对话

   ![image-20240423162407678](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240423162407678.png)



### 2.修改配置

#### 对话配置

发送如下格式文字 ，

```
接口/模型/密钥/角色 值
```

#### 示例：

修改角色

![image-20240423162102474](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240423162102474.png)



修改对话设置

![image-20240423163136612](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240423163136612.png)

### 3. 其他配置

#### 3.1 好友申请自动通过口令

当好友申请验证信息和口令一致时，自动通过。

![image-20240423163520087](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240423163520087.png)



#### 3.2 词汇过滤

可设置和移除敏感词汇，防止出现危害言论。

添加或移除多个敏感词时，用中文逗号隔开。

![image-20240423164142194](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240423164142194.png)






## 说明

* 请准守微信使用条款及国家法律法规，切勿用于非法用途。
* 代码仅供交流使用。



