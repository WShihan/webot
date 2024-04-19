![GitHub Repo stars](https://img.shields.io/github/stars/WShihan/webot?style=plastic)  ![GitHub repo size](https://img.shields.io/github/repo-size/WShihan/webot?style=plastic)   ![GitHub](https://img.shields.io/github/license/WShihan/webot) ![GitHub last commit](https://img.shields.io/github/last-commit/WShihan/webot?style=plastic) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/WShihan/webot)

## 介绍

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/tiger.png" width="30px" alt="小助手"  /></p>



<p>一个基于<a href="https://github.com/wechaty/wechaty">wechaty</a>的迷你<img width="15px" src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/icon/wechat.svg" style="display: inline-block;">机器人。</p>

   

功能：

* AI对话，可接入ChatGPT。
* 自定义指令。通过触发已设定指令完成特定任务。

​    

当前自定义指令如下：

* 实时天气查询

  ``````shell
  ##天气 城市
  ``````

* NBA赛程结果

  ```shell
  ##nba 
  ```

## 使用

### 准备

* Node > 12
* 一个微信账号
* 自定义指令需第三方支持



### 安装

1.克隆仓库

```shell
git clone https://github.com/WShihan/webot.git
```

  

2.修改配置

修改config目录下的index文件，填入相应配置项

```json
{
    // GPT 接口地址
    GPT_URL:'',
    // GPT接口密钥
    GPT_KEY: '', 
    // GPT模型
    GPT_MODEL: 'gpt-3.5-turbo',
    // 角色描述
    COSPLAY: "你是一个聪明的微信机器人，需要在不违反微信协议的情况下回答我的问题，答案尽量简洁明了，语气可以俏皮可爱一点。",
    // 英语单词背诵任务启动时间
    ENGLISH_TIME: '00 20 18 * * *',
    // 自定义命令接口
    CMD_URL: '',
}
```

  

3.安装依赖

在终端进入项目目录，执行如下命令安装依赖

```shell
npm install
```

   

4.启动机器人

执行如下命令启动机器人后，终端会显示二维码，需要打开手机客户端扫码登入。      
⚠️ 注意：一定记得要使用小号，因为存在封号风险。

```shell
npm start
```

![image-20240416134131663](https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416134131663.png)  

   

如果你没有机器可供部署，可以添加我已经部署好的助手体验（备注：github）。

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416140029042.png" alt="image-20240416140029042" width="50%"  style="border-radius: 5px;" /></p>



以下是一些截图：  

   

<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416141851240.png" alt="image-20240416141835574"  width="50%" style="border-radius: 10px;" /></p>




<p align="center"><img src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/image-20240416141835574.png" alt="image-20240416141835574"  width="50%"  style="border-radius: 10px;" /></p>







## 说明

* 请准守微信使用条款及国家法律法规，切勿用于非法用途。
* 代码仅供交流使用。



