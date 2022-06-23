# 微信小程序-基于node实现自动打包上传代码

在平时的小程序开发过程中，可能会遇到下面这些小问题，虽然不影响开发过程，但是开发体验确会差一点，具体如下：

- 每次在编辑器中运行构建命令，第一次还**需要手动打开微信开发者工具，打开指定项目**
- 每次准备发布体验版时，**需要先在本地打包，等待打包完成，在开发者工具中点击上传代码**

那么怎么避免重复的操作，特别是比较频繁的发布场景，可能每天需要多次的等待及上传操作。

对于问题1，相信很多人想的，就是每次输入命令时，微信开发者工具可以自动打开，并且可以打开当前指定的项目；对于问题2，每次输入构建发布命令时，先执行打包操作，然后自动执行上传操作，不需要人为等待打包结束已经人为点击发布按钮。

## 实现一个自动上传功能

### miniprogram-ci

官方发布的cli命令，不需要开发者工具，进行小程序代码的上传、预览等操作等。网上这方面的文档挺多的，不细说。

采用这个方法的，需要提供小程序的秘钥与设置IP白名单，可能会存在一定的风险，**比较适用于有独立的打包发布平台，在指定机器上进行打包操作**

### nodejs实现自动上传

其实，通过nodejs写的脚本或者shell之类的，可以快速实现自动上传的效果。**核心原理就是通过child_process开启一个多进程，在执行完打包命令后，运行官方提供的[命令行V2](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#%E8%87%AA%E5%8A%A8%E9%A2%84%E8%A7%88)**，常见的API如下：

```javascript
// 登录
cli login
// 预览
cli preview
// 上传
cli upload
// 启动开发者工具
cli open
```

**相比miniprogram-ci，使用脚本的方式实现时，会依赖开发者工具，当微信开发者工具未登录时，运行自动上传命令会报错**，因此也添加了判断未登录时，会在命令行中生成二维码，扫码登录即可。

同时，**采用child_process不依赖任何三方包，每个人的电脑只要安装node环境与微信开发者工具就行了**

具体实现如下：

```javascript
// upload.js
#!/usr/bin/env

const child = require('child_process');
const exec = child.execSync;

function getDays() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const strDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `在${year}年${month}月${strDate}日${hours}点${minutes}分提交上传`;
}

function getName() {
  const arr = process.cwd().split('/');
  return arr[2];
}

const branch = child.execSync('git name-rev --name-only HEAD', { encoding: 'utf8' });

const config = {
  path: `/Applications/wechatwebdevtools.app/Contents/MacOS/cli`,
  projectPath: `${process.cwd()}/dist`,
  version: `1.2.1`,
  desc: `${getName()}${getDays()}，发布分支${branch}`,
};

exec('npm run build', { stdio: 'inherit' });

child.exec(
  `${config.path} upload --project ${config.projectPath} -v ${config.version} -d ${config.desc}`,
  { stdio: 'inherit' },
  (err, res) => {
    if (res) {
      exec(`${config.path} login --qr-size small`, { stdio: 'inherit' });
      exec(
        `${config.path} upload --project ${config.projectPath} -v ${config.version} -d ${config.desc}`,
        { stdio: 'inherit' }
      );
    }
  }
);
```

```javascript
// package.json
"scripts": {
  "upload": "node upload.js"
}
```



### 使用shell的方式实现自动上传

对于前端来说，平时写shell可能不是特别多，但是它真的可以解决非常多的问题，非常的便捷。

平时写shell，一般分两种，直接写shell，或者用三方包来写，比较知名的有**shelljs**与**zx**。对于shelljs，其实是对child_process做了一层封装，保证了多端语法一致性。而zx是Google出品的，语法更贴合前端。我们本次就是采用zx来实现。

```javascript
// 全局安装zx
sudo npm install -g zx
```

具体实现如下：

```javascript
// upload.mjs
#!/usr/bin/env zx

function getDays() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const strDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `在${year}年${month}月${strDate}日${hours}点${minutes}分 提交上传`;
}

const branch = await $`git branch --show-current`;

const config = {
  path: `/Applications/wechatwebdevtools.app/Contents/MacOS/cli`,
  projectPath: `${process.cwd()}/dist`,
  version: `1.2.1`,
  desc: `${getDays()}，发布分支${branch}`,
};

await $`npm run build`;

await $`${config.path} upload --project ${config.projectPath} -v ${config.version} -d ${config.desc}`;
```

```javascript
// package.json
"scripts": {
  "upload": "zx upload.mjs"
}
```



## 自动打开开发者工具

```javascript
// open.js
#!/usr/bin/env

const child = require('child_process');
const exec = child.execSync;

const path = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
const projectPath = `${process.cwd()}/dist`;

child.exec('git branch --show-current', (err, res) => {
  console.log('当前分支：', res);
});

child.exec(`${path} open --project ${projectPath}`, (err, res) => {
  if (res) {
    exec(`${path} login --qr-size small`, { stdio: 'inherit' });
    exec(`${path} open --project ${projectPath}`, { stdio: 'inherit' });
    exec('npm run dev', { stdio: 'inherit' });
  } else {
    exec('npm run dev', { stdio: 'inherit' });
  }
});
```

```javascript
// package.json
"scripts": {
  "open": "node open.js"
}
```

