![GitHub Repo stars](https://img.shields.io/github/stars/WShihan/webot?style=plastic)  ![GitHub repo size](https://img.shields.io/github/repo-size/WShihan/webot?style=plastic)   ![GitHub](https://img.shields.io/github/license/WShihan/webot) ![GitHub last commit](https://img.shields.io/github/last-commit/WShihan/webot?style=plastic) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/WShihan/webot)

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
  "GPT_URL": "",
  "GPT_KEY": "",
  "GPT_MODEL": "gpt-3.5-turbo",
  "ROLE": "你是一个微信机器人，你要如实回答我的问题！",
  "FRIENDSHIP_PASS": "哈哈哈"
}

```

  说明：

* GPT_URL： chatgpt接口地址
* GPT_KEY：chatgpt密钥
* GPT_MODEL：chatgpt模型
* ROLE：系统提示词（角色）
* FRIENDSHIP_PASS：好友申请自动通过口令



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

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416140029042.png" alt="image-20240416140029042" width="50%"  style="border-radius: 5px;" /></p>



## 使用

### 1.对话

直接发送消息对话

   

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416141851240.png" alt="image-20240416141835574"  width="50%" style="border-radius: 10px;" /></p>

### 2.修改角色

发送 “角色 描述文字”



<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/%E8%8B%B1%E8%AF%AD%E8%A7%92%E8%89%B2.jpeg" alt="image-20240416141835574"  width="50%"  style="border-radius: 10px;" /></p>











## 说明

* 请准守微信使用条款及国家法律法规，切勿用于非法用途。
* 代码仅供交流使用。



