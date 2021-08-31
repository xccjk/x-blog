# dependencies vs devDependencies

## dependencies与devDependencies是什么

在package中常常可以看到dependencies与devDependencies，但是大家对于这两个有什么深入了解吗？
当你发布一个项目到npm上时，通常会将node_modules添加到.gitignore文件中，是为了避免文件过大导致上传失败
当别人clone你的项目到本地时，并试图运行你的项目时，会发现没有任何效果，这是因为你本地的依赖安装在了你的node_modules上，但是你没有推送到远程仓库上。
解决问题的唯一方法就是别人`npm install`，他会安装package.json中所有依赖到的库

`package.json文件主要存储了项目的一些依赖关系及其他信息`

dependencies本意为`依赖`，devDependencies的本意为`开发依赖`

## dependencies与devDependencies分别有什么作用

dependencies: 应该包含项目的基础框架，比如vue，react等

```javascript
  // 安装项目依赖
  npm install xxx -S
  npm install xxx --save
  npm install xxx
```

devDependencies: 应该包含在开发期间使用的软件包或用于构建捆绑包的软件包，例如mocha，jsc，grunt-contrib-watch，gulp-jade等。这些软件包仅在开发项目时才是必需的，ESlint用于在构建捆绑包时检查所有内容

```javascript
  // 安装开发依赖
  npm install xxx --dev
  npm install xxx -D
```
